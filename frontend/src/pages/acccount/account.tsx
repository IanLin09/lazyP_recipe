import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import Button from 'react-bootstrap/Button';
import { Alert, Col, Row } from 'react-bootstrap';
import { ErrorResponse, parseErrors } from '@/utils/error';
import { UserDTO } from '@/utils/dto';
import swAlert from "@/components/alert"
import { Formik, Field,FormikErrors } from 'formik';
import { emailSchema } from '@/utils/validation';
import { useHeader } from '@/components/header';
import api from "@/utils/axios"
import { auth } from '@/utils/cookie';

const AccountInfo = () => {
    const { setHeader } = useHeader();
    const [alert, setAlert] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState<UserDTO>({
        email: '',
        name: ''
    });

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await api.get(import.meta.env.VITE_API_URL + `/account`);
                const data: UserDTO = { ...response.data.data };
                setInitialValues(data);
            } catch (e:unknown) {
                if (e instanceof AxiosError) {
                    const errorMsg: ErrorResponse = e.response?.data;
                    switch (errorMsg.status){
                        case 400:{
                            setAlert(errorMsg.message);
                            const errorMap = parseErrors(errorMsg);
                        }
                        case 401:{
                            swAlert.confirm({ title:"Error",content: "Please login agian." });
                            auth.removeToken()
                            window.location.replace("/home")
                        }
                        default:{
                            setAlert("Unknown error occurred");
                        }
                    }
                }
            }
        };

        fetchAccount();
        setHeader("Account Info", "");
    }, []);

    const handleFormSubmit = async (values:UserDTO,setErrors: (errors: FormikErrors<UserDTO>) => void) => {
        setLoading(true);
        try {
            const response = await api.put(
                import.meta.env.VITE_API_URL + '/account',
                values,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data?.status === 200) {
                swAlert.confirm({ title:"Success",content: "Update successful" });
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
                        window.location.replace("/home")
                    }
                    default:{
                        setAlert("Unknown error occurred");
                    }
                }
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='container'>
            <Formik
                validationSchema={emailSchema}
                initialValues={initialValues}
                validateOnChange={false}
                validateOnBlur={false}
                enableReinitialize
                onSubmit={async (values, { setErrors }) => {
                    handleFormSubmit(values,setErrors)
                }}
            >
                {({ handleSubmit, errors, values }) => (
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
                                    disabled={loading}
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
};

export default AccountInfo;