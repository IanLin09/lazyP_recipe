import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import Button from 'react-bootstrap/Button';
import { Alert, Col, Row } from 'react-bootstrap';
import { ErrorResponse, parseErrors } from '@/utils/error';
import { UserPasswordDTO } from '@/utils/dto';
import swAlert from "@/components/alert"
import { Formik, Field,FormikErrors } from 'formik';
import { passwordSchema } from '@/utils/validation';
import { useHeader } from '@/components/header';
import api from "@/utils/axios"
import { auth } from '@/utils/cookie';

const PasswordInfo = () => {
    const { setHeader } = useHeader();
    const [alert, setAlert] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState<UserPasswordDTO>({
        newPassword:'',
        oldPassword:'',
        newPasswordConfirm:''
    });

    useEffect(() => {

        setHeader("Account Info", "");
    }, []);

    const handleFormSubmit = async (values:UserPasswordDTO,setErrors: (errors: FormikErrors<UserPasswordDTO>) => void) => {
        setLoading(true);
        try {
            const response = await api.put(
                import.meta.env.VITE_API_URL + '/password',
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
                const errorMsg: ErrorResponse = e.response?.data;
                switch (errorMsg.status){
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
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='container'>
            <Formik
                validationSchema={passwordSchema}
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
                        <h3>Change Password</h3>
                        {alert && <Alert variant="danger">{alert}</Alert>}
                        <Row>
                            <Col md="4">
                                <Form.Group className="mb-3">
                                    <Form.Label>Old password</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        isInvalid={!!errors.oldPassword}
                                        name="oldPassword"
                                        type="password"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.oldPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                                <Form.Group className="mb-3">
                                    <Form.Label>New password</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        isInvalid={!!errors.newPassword}
                                        name="newPassword"
                                        type="password"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.newPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                                <Form.Group className="mb-3">
                                    <Form.Label>New password confirm</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        isInvalid={!!errors.newPasswordConfirm}
                                        name="newPasswordConfirm"
                                        type="password"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.newPasswordConfirm}
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

export default PasswordInfo;