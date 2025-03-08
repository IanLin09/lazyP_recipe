import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { AxiosError } from 'axios';
import Button from 'react-bootstrap/Button';
import { Alert, Col, Row } from 'react-bootstrap';
import { ErrorResponse, parseErrors } from '@/utils/error';
import { UserDTO } from '@/utils/dto';
import swAlert from "@/components/alert"
import { Formik, Field,FormikErrors } from 'formik';
import { emailSchema } from '@/utils/validation';
import api from "@/utils/axios"
import { useQuery,useMutation } from '@tanstack/react-query';
import { LoadingScene } from '@/components/loading';

const fetchAccount = async () => {
    const response = await api.get(`/account`);
    const data: UserDTO = { ...response.data.data };
    return data;
};

const accountUpdate = async (initialValues:UserDTO) => {
    const response = await api.put('/account', initialValues, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

const AccountInfo = () => {
    const [alert, setAlert] = useState<string | null>(null);
    const { data: accuontInfo, isLoading, isError,isSuccess } = useQuery({
        queryKey: ['accuontInfo'],  // Ensure `formData` changes trigger refetch
        queryFn: fetchAccount, // No direct params, `queryKey` will be used
        placeholderData: (lastData) => lastData,
    });

    const mutation =  useMutation({
        mutationFn: accountUpdate,
        onSuccess: async () => {
            swAlert.confirm({ title:"Success",content: "Update successful" });
            setAlert("");
        }
    });

    if (isLoading){
        return <LoadingScene/>
    }

    if (isError){
        swAlert.confirm({ title: "Error", content: "Unknown error occurred.", icon: "error" });
        return <></>
    }

    const handleFormSubmit = async (values:UserDTO,setErrors: (errors: FormikErrors<UserDTO>) => void) => {
        try {
            await mutation.mutateAsync(values);
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                switch (e.response?.status){
                    case 400:{
                        const errorMsg: ErrorResponse = e.response?.data;
                        setAlert(errorMsg.message);
                        const errorMap = parseErrors(errorMsg);
                        setErrors(errorMap);
                        break;
                    }
                    case 401:{
                        await swAlert.confirm({ title:"Error",content: "Please login agian.","icon":"error" });
                        window.location.replace("/home")
                        break;
                    }
                    default:{
                        setAlert("Unknown error occurred");
                        break;
                    }
                }
            }
        }
    }
    if (isSuccess){
        return (
            <div className='container'>
                <Formik
                    validationSchema={emailSchema}
                    initialValues={accuontInfo ? accuontInfo : {email:"", name:""}}
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize
                    onSubmit={async (values, { setErrors }) => {
                        handleFormSubmit(values,setErrors)
                    }}
                >
                    {({ handleSubmit, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <h3>Account Information</h3>
                            {alert && <Alert variant="danger">{alert}</Alert>}
                            <Row>
                                <Col md="4">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Field
                                            as={Form.Control}
                                            isInvalid={!!errors.name}
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Enter user name"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email address</Form.Label>
                                        <Field
                                            as={Form.Control}
                                            isInvalid={!!errors.email}
                                            name="email"
                                            type="email"
                                            id="email"
                                            placeholder="Enter email"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4">
                                    <Button
                                        type="submit"
                                        size='lg'
                                        variant="success"
                                        disabled={mutation.isPending}
                                    >
                                        Update
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
    
};

export default AccountInfo;