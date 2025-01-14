import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useHeader } from '@/components/header';
import { RecipeDTO,CreateEmptyRecipe, RecipeMaterialDTO, RecipeStepDTO } from '@/utils/dto';
import MaterialsGroup from '@/components/material.form';
import StepGroup from '@/components/step.form';
import * as formik from 'formik';
import {RecipeSchema} from "@/utils/validation";


type FormControlElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const CreateRecipe = () => {
    const { Formik } = formik;

    const { setHeader } = useHeader();
    const [formData,setFormData] = useState<RecipeDTO>(CreateEmptyRecipe())

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

    //due toFformik can't use custom submit directly, so separate to two part
    const handleFormSubmit = async() => {
        
        console.log(321)
        console.log(formData)
    }

    //the part trigger the validation
    const handleFormValidateSubmit = async (e: React.FormEvent<HTMLFormElement>, submitFormik: () => void) => {
        
        e.preventDefault();
        submitFormik()
    };

    useEffect(() => {
        setHeader("Recipes", "Find your favorite recipes here");
        return () => {
            setHeader("LazyP", "For the people who think cooking spend to much time.");
        };
    }, []);

    return (
        <div className="container">
            <Formik
                validationSchema={RecipeSchema}
                initialValues={formData}
                enableReinitialize
                onSubmit={handleFormSubmit}
            >
            {({ setFieldValue,handleSubmit,errors }: formik.FormikProps<RecipeDTO>) => (
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
                                handleFormChange(e,setFieldValue);
                            }}
                            name="category"
                            aria-label="Recipe's tag"
                            value={formData.tags === null ? '' : formData.tags?.category}
                        >
                            <option value="1">Meat</option>
                            <option value="2">Veges</option>
                            <option value="3">Main Dish</option>
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

export default CreateRecipe

