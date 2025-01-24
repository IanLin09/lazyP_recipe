import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios,{AxiosError} from 'axios';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';
import { ErrorResponse,parseErrors } from '@/utils/error';
import * as formik from 'formik';
import { emailSchema } from '@/utils/validation';
import swAlert from "@/components/alert"

type loginInput = {
    email: string,
}

interface Props{
  onHide:(() => void),
}


const ForgotPasswordForm = (props:Props) => {
    const { Formik } = formik;
    const [alert, setAlert] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<loginInput>({
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
    
   
    return (
        <>
            <Formik
                validationSchema={emailSchema}
                initialValues={formData}
                validateOnChange={false} 
                validateOnBlur={false}
                enableReinitialize
                onSubmit={async (values, { setErrors }) => { 
                    setLoading(true)
                    try {
                      const response = await axios.post(import.meta.env.VITE_API_URL+'/forgot', values, {
                        headers: {
                          'Content-Type': 'application/json'
                        }
                      });
                      if (response.data?.status == 200){
                        await swAlert.confirm({title:"Success",content:"Success, please check email."});
                        props.onHide();
                      }
                       // window.location.href = "/recipe/list"
                    } catch (e: unknown) {
                        if (e instanceof AxiosError) {
                            
                            let errorMsg: ErrorResponse = e.response?.data;
                            if (errorMsg.status == 400){
                                const errorMap = parseErrors(errorMsg);
                                setErrors(errorMap);
                            }

                            if (errorMsg.status == 400){
                                setAlert("Unknown error occuried")
                            } 
                            
                        }
                    }finally{
                      setLoading(false);
                    }
                }}
            >
              {({ handleSubmit,errors }: formik.FormikProps<loginInput>) => (
            <Form noValidate onSubmit={handleSubmit}>
            {alert && <Alert variant="danger">{alert}</Alert>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    isInvalid={!!errors.email} 
                    onChange={handleChange} 
                    value={formData.email}
                     name="email" 
                     type="email" 
                     placeholder="Enter email" 
                     />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                    {!errors.email && 
                    <Form.Text className="text-muted">
                      You will receive an email with temporary password.     
                    </Form.Text>
                    }
                </Form.Group>

                <div className='float-end'>
                    <Button type="submit" variant="success" disabled={loading}>Send</Button>
                </div>
            </Form>
            )}
            </Formik>
        </>
    )
}

export default ForgotPasswordForm