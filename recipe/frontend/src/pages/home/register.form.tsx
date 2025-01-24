import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios,{AxiosError} from 'axios';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';
import { ErrorResponse,parseErrors } from '@/utils/error';
import swAlert from "@/components/alert"
import * as formik from 'formik';
import { emailSchema } from '@/utils/validation';


type loginInput = {
    email: string,
    password:string
}

interface Props{
  onHide:(() => void),}


const ForgotPasswordForm = (props:Props) => {
    const { Formik } = formik;
    const [alert, setAlert] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const initialValue:loginInput = {
      email:'',
      password:''
    }
    
    const handleFormSubmit = async (values:loginInput,setErrors: (errors: formik.FormikErrors<loginInput>) => void) => {
      try {
        setLoading(true)
        const response = await axios.post(import.meta.env.VITE_API_URL+'/register', values, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data?.status == 200){
          swAlert.confirm({content:"Registration successful, please log in again."});
          props.onHide();
        }

      } catch (e: unknown) {
          if (e instanceof AxiosError) {
              
              let errorMsg: ErrorResponse = e.response?.data;
              if (errorMsg.status == 400){
                  setAlert(errorMsg.message)
                  const errorMap = parseErrors(errorMsg);
                  setErrors(errorMap);
              }

              if (errorMsg.status == 500){
                setAlert("Unknown error occuried")
              } 
              
          }
      }finally{
        setLoading(false);
      }
    }
    return (
        <>
            <Formik
                validationSchema={emailSchema}
                initialValues={initialValue}
                validateOnChange={false} 
                validateOnBlur={false}
                enableReinitialize
                onSubmit={async (values, { setErrors }) => { 
                  handleFormSubmit(values,setErrors)                    
                }}
            >
              {({ handleChange,handleSubmit,errors }: formik.FormikProps<loginInput>) => (
            <Form noValidate onSubmit={handleSubmit}>
            {alert && <Alert variant="danger">{alert}</Alert>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    isInvalid={!!errors.email} 
                    onChange={handleChange} 
                     name="email" 
                     type="email" 
                     placeholder="Enter email" 
                     />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                    
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    onChange={handleChange} 
                    name="password"
                    type="password" 
                    isInvalid={!!errors.password} 
                    placeholder="Password" 
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
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