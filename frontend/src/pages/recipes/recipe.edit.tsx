import React, { useState,useEffect, } from 'react';
import Button from 'react-bootstrap/Button';
import { Alert,Col,Form,Row } from 'react-bootstrap';
import { useHeader } from '@/components/header';
import { RecipeDTO,CreateEmptyRecipe, RecipeMaterialDTO, RecipeStepDTO, RecipeTagDTO } from '@/utils/dto';
import MaterialsGroup from '@/pages/recipes/material.form';
import StepGroup from '@/pages/recipes/step.form';
import * as formik from 'formik';
import {RecipeSchema} from "@/utils/validation";
import { ErrorResponse,parseErrors } from '@/utils/error';
import api from "@/utils/axios"
import {AxiosError} from 'axios'
import { parseRecipe } from '@/utils/parse';
import { useParams } from "react-router-dom";
import swAlert from "@/components/alert"
import { auth } from '@/utils/cookie';


type FormControlElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const EditRecipe = () => {
    const { Formik } = formik;
    const { id } = useParams<{ id: string }>();
    const { setHeader } = useHeader();
    const [formData,setFormData] = useState<RecipeDTO>(CreateEmptyRecipe())
    const [alert, setAlert] = useState<string | null>(null);

    const handleFormChange = (
        e: React.ChangeEvent<FormControlElement>,
        setFieldValue: (field: string, value: any) => void
    ) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement; // Type assertion
        const { name, value, type } = target;
        const columnValue = type === "number" ? +value : value;
        setFieldValue(name, columnValue);
        setFormData(prev => ({
          ...prev,
          [name]: columnValue
        }));
    };

    const handleTagChange = (e: React.ChangeEvent<FormControlElement>) => {
        const updatedTag = { ...formData.tags } as RecipeTagDTO;
        const { name, value } = e.target;

        if (name === 'category') {
            updatedTag[name] = +value;
        }
        setFormData(prev => ({
            ...prev,
            tags: updatedTag
        }));
    }

    const handleMaterialsChange = (updatedMaterials: RecipeMaterialDTO[]) => {
        setFormData(prev => ({
            ...prev,
            materials: updatedMaterials
        }));
    };

    const handleStepsChange = (updatedSteps: RecipeStepDTO[]) => {
        setFormData(prev => ({
            ...prev, 
            steps: updatedSteps
        }));
    };

    //due toFformik can't use custom submit with complicate Type directly, so separate to two part
    //the part trigger the validation
    const handleFormValidateSubmit = async (e: React.FormEvent<HTMLFormElement>, submitFormik: () => void) => {
        e.preventDefault();
        submitFormik()
    };

    useEffect(() => {
        const fetchRecipe = async () => {

            try {
                const response = await api.get(import.meta.env.VITE_API_URL+`/recipe/${id}`);
                const data:RecipeDTO = await parseRecipe(response.data.data)
                setFormData(data)
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
        setHeader("Edit Recipe", "");
        return () => {
            setHeader("LazyP", "");
        };
    }, []);

    return (
        <div className="container">
            {alert && <Alert variant="danger">{alert}</Alert>}
            <Formik
                validationSchema={RecipeSchema}
                initialValues={formData}
                validateOnChange={false} 
                validateOnBlur={false}
                enableReinitialize
                onSubmit={async (values, { setErrors }) => { 
                    try {
                        const response = await api.put(import.meta.env.VITE_API_URL+`/recipe/${id}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                        if (response.data?.status == 200){
                            await swAlert.confirm({title:"Success",content:"Update success"});
                            window.location.reload();
                        }
                        
                    } catch (e: unknown) {
                        if (e instanceof AxiosError) {
                            switch (e.response?.status){
                                case 400:{
                                    const errorMsg: ErrorResponse = e.response?.data;
                                    setAlert(errorMsg.message);
                                    const errorMap = parseErrors(errorMsg);
                                    setErrors(errorMap);
                                }
                                case 401:{
                                    await swAlert.confirm({ title:"Error",content: "Please login agian.","icon":"error" });
                                    auth.removeToken()
                                    window.location.replace("/home")                                    
                                }
                                default:{
                                    setAlert("Unknown error occurred");
                                }
                            }
                            
                        }
                    }
                }}
            >
            {({ setErrors,setFieldValue,handleSubmit,errors }: formik.FormikProps<RecipeDTO>) => (
            <Form noValidate onSubmit={(e) => handleFormValidateSubmit(e, handleSubmit)}>
                <Row>
                    <Col>
                        <h3>Recipe</h3>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label className='required-label'>Recipe Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            onChange={(e) => {
                                handleFormChange(e,setFieldValue);
                            }}
                            value={formData.name}
                            name="name"
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom02">
                        <Form.Label>Category</Form.Label>
                        <Form.Select 
                            onChange={(e) => {
                                handleTagChange(e);
                            }}
                            name="category"
                            aria-label="Recipe's tag"
                            value={formData.tags === null ? '1' : formData.tags?.category}
                        >
                            <option value="3">Main Dish</option>
                            <option value="1">Meat</option>
                            <option value="2">Veges</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustomUsername">
                        <Form.Label className='required-label'>Servings</Form.Label>
                        
                        <Form.Control
                        type="number"
                        placeholder="servings"
                        min="0"
                        value={formData.servings}
                        onChange={(e) => {
                            handleFormChange(e,setFieldValue);
                        }}
                        required
                        name="servings"
                        />
                        <Form.Control.Feedback type="invalid">
                        Please choose a username.
                        </Form.Control.Feedback>
                    
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                        <Form.Label className='required-label'>Description</Form.Label>
                        <Form.Control
                            required
                            type="textarea"
                            onChange={(e) => {
                                handleFormChange(e,setFieldValue);
                            }}
                            isInvalid={!!errors.description}
                            value={formData.description}
                            name="description"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="my-3">
                    <Form.Group as={Col} md="12">
                        <Form.Label >Video link</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            onChange={(e) => {
                                handleFormChange(e,setFieldValue);
                            }}
                            value={formData.video_link}
                            name="video_link"
                            placeholder='youtube only'
                        />
                    </Form.Group>
                </Row>
                <hr className='my-5'/>
                <Row>
                    <Col>
                        <h3>Ingredients</h3>
                    </Col> 
                </Row>
                {formData.materials && 
                <MaterialsGroup 
                errors={(errors.materials as formik.FormikErrors<RecipeMaterialDTO>[] | undefined) || []}
                setFieldValue={setFieldValue}
                materials={formData.materials} 
                setMaterials={handleMaterialsChange}/>}
                <hr className='my-5'/>
                
                 <Row>
                    <Col>
                        <h3>Directions</h3>
                    </Col> 
                </Row>
                {formData.steps && 
                <StepGroup 
                errors={(errors.steps as formik.FormikErrors<RecipeStepDTO>[] | undefined) || []}
                steps={formData.steps} 
                setSteps={handleStepsChange} 
                setFieldValue={setFieldValue}/>}

                <hr className='my-5'/>
                <div className="mb-3 h-100 d-flex justify-content-end">
                    <Button type="submit">Submit form</Button>
                </div>

                </Form>
            )}
            </Formik>
        </div>
    );
}

export default EditRecipe

