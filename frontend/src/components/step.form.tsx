import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import { RecipeStepDTO } from '@/utils/dto';
import {FormikHelpers,FormikErrors} from 'formik';

  
type StepGroupProps = {
    steps: RecipeStepDTO[];
    setSteps: (steps: RecipeStepDTO[]) => void;
    setFieldValue: FormikHelpers<RecipeStepDTO>['setFieldValue'];
    errors: Array<FormikErrors<RecipeStepDTO>>;
};

const StepGroup:React.FC<StepGroupProps> = ({steps,setSteps,setFieldValue,errors}) => {

    //focusing on step index and value
    const handleChange = (index: number, field: keyof RecipeStepDTO, value: string | number) => {
        const updatedStep = [...steps];
        updatedStep[index] = {
            ...updatedStep[index],
            [field]: value,
        };
        setFieldValue(`step[${index}].${field}`,value)
        setSteps(updatedStep);
    };
    
    const addStep = () => {
        const newStep: RecipeStepDTO = { description: '', step: 0};
        setSteps([...steps, newStep]);
    };

    const removeStep = async (indexToRemove: number) => {
        const updatedStep = await steps.filter((_, index) => index !== indexToRemove);
        setSteps(updatedStep);
    };
    return (
        <>
        {steps.map((step,index) => (
            <div key={`steps-${index}`}>
            <Row className='my-4' >
                <Form.Group as={Col} md="4" >
                    <Form.Label className='required-label'>Step</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        min={1}
                        onChange={(e) => handleChange(index,"step",e.target.value)}
                        value={step.step ? step.step : index + 1}
                        name={`steps[${index}].step`}
                        isInvalid={!!errors[index]?.step}
                    />
                    
                    <Form.Control.Feedback type="invalid">
                        {errors[index]?.step}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" >
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e) => handleChange(index,"image_file",e.target.value)}
                        value={step.image_file}
                        name={`steps[${index}].image_file`}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" >
                {index > 0 &&<Button onClick={() => removeStep(index)} className="mt-4"  variant="danger">
                    Delete
                </Button>}
                </Form.Group>
            </Row>
            <Row className='my-4'>
                <Col>
                    <Form.Group >
                        <Form.Label className='required-label'>Step Description</Form.Label>
                        
                        <Form.Control
                            required
                            as="textarea"
                            style={{height:"100px"}}
                            onChange={(e) => handleChange(index,"description",e.target.value)}
                            value={step.description}
                            name={`steps[${index}].description`}
                            isInvalid={!!errors[index]?.description}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors[index]?.description}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <hr className='my-3'/>
            </div>
        ))}
        <Row className="align-items-end">
            <Col>
                <Button onClick={addStep} className="mb-3" variant="success">
                        Add
                </Button>
            </Col>        
        </Row>
        </>
    )
}

export default StepGroup