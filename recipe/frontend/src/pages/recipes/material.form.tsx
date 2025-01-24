import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Col, Row } from 'react-bootstrap';
import { RecipeMaterialDTO } from '@/utils/dto';
import {FormikHelpers,FormikErrors} from 'formik';

  
type MaterialGroupProps = {
    materials: RecipeMaterialDTO[];
    setMaterials: (materials: RecipeMaterialDTO[]) => void;
    setFieldValue: FormikHelpers<RecipeMaterialDTO>['setFieldValue']; 
    errors: Array<FormikErrors<RecipeMaterialDTO>>;
};

const MaterialsGroup:React.FC<MaterialGroupProps> = ({materials,setMaterials,setFieldValue,errors}) => {

    //focusing on material index and value
    const handleChange = (index: number, field: keyof RecipeMaterialDTO, value: string | number) => {
        const updatedMaterials = [...materials];
        updatedMaterials[index] = {
            ...updatedMaterials[index],
            [field]: value,
        };
        setFieldValue(`materials[${index}].${field}`,value)
        setMaterials(updatedMaterials);
    };
    
    const addMaterial = () => {
        const newMaterial: RecipeMaterialDTO = { name: '', number: 0, unit: '' };
        setMaterials([...materials, newMaterial]);
    };

    const removeMaterial = async (indexToRemove: number) => {
        const updatedMaterials = await materials.filter((_, index) => index !== indexToRemove);
        setMaterials(updatedMaterials);
    };
    return (
        <>
        {materials.map((material,index) => (
            <Row key={`material-${index}`}>
                <Col>
                <InputGroup className="mb-3">
                    <FloatingLabel
                        label="Name"
                        className="mb-3"
                    >
                        <Form.Control
                        placeholder="Name"
                        aria-label="Ingredient Name"
                        value={material.name}
                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                        name={`materials[${index}].name`}
                        isInvalid={!!errors[index]?.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors[index]?.name}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel
                        label="Amount"
                        className="mb-3"
                    >
                        <Form.Control
                        placeholder="Amount"
                        aria-label="Ingredient Amount"
                        value={material.number}
                        onChange={(e) => handleChange(index, 'number', e.target.value)}
                        name={`materials[${index}].number`}
                        isInvalid={!!errors[index]?.number}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors[index]?.number}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel
                        label="Unit"
                        className="mb-3"
                    >
                        <Form.Control
                        placeholder="Unit"
                        aria-label="Ingredient Unit"
                        value={material.unit}
                        onChange={(e) => handleChange(index, 'unit', e.target.value)}
                        name={`materials[${index}].unit`}
                        isInvalid={!!errors[index]?.unit}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors[index]?.unit}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    
                    {index > 0 &&<Button onClick={() => removeMaterial(index)} className="mt-3" style={{height:'50%' }} variant="danger">
                        Delete
                    </Button>}
                    
                </InputGroup>
                </Col>
            </Row>
        ))}
        <Row className="align-items-end">
            <Col>
                <Button onClick={addMaterial} className="mb-3" variant="success">
                        Add
                </Button>
            </Col>        
        </Row>
        </>
    )
}

export default MaterialsGroup