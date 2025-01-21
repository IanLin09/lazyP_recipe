import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios,{AxiosError} from 'axios';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';
import { ErrorResponse,parseErrors } from '@/utils/error';
import { auth } from '@/utils/cookie'
import { UserDTO } from '@/utils/dto';
import swAlert from "@/components/alert"



type loginInput = {
    email: string,
    password: string
}

interface Props{
  onHide:(() => void),}


const LoginForm = (props:Props) => {

    const [error, setError] = useState<Partial<loginInput>>({
      email: '',
      password: ''
    });
    const [alert, setAlert] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<loginInput>({
        email: '',
        password: ''
      });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setError({
        email: "",
        password: ""
      });
      try {
          
        const response = await axios.post(import.meta.env.VITE_API_URL+'/login', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const userData:UserDTO = {...response.data?.data}
        if (userData.token){
          auth.setToken(userData.token)
        }
        
        if (response.data?.status == 200){
          props.onHide()
          setAlert(null)
          setFormData({ email: '', password: ''});
          setError({ email: '', password: ''});
          await swAlert.confirm({title:"Success",content:"Login success"});
          window.location.reload();
        }
       
      } catch (err) {
        if (err instanceof AxiosError){
          let errorMsg :ErrorResponse = err.response?.data
          const errorMap = parseErrors(errorMsg);
          setAlert(errorMsg.message)
          setError({...errorMap})
        }else{
          setAlert(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    
    return (
        <>
            <Form onSubmit={handleSubmit}>
            {alert && <Alert variant="danger">{alert}</Alert>}
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    isInvalid={!!error.email} 
                    onChange={handleChange} 
                    value={formData.email}
                     name="email" 
                     type="email" 
                     placeholder="Enter email" 
                     />
                    <Form.Control.Feedback type="invalid">
                      {error.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    onChange={handleChange} 
                    value={formData.password} 
                    name="password"
                    type="password" 
                    isInvalid={!!error.password} 
                    placeholder="Password" 
                    />
                    <Form.Control.Feedback type="invalid">
                      {error.password}
                    </Form.Control.Feedback>
                </Form.Group>

                <div className='float-end'>
                    <Button type="submit" variant="success" disabled={loading}>Send</Button>
                </div>
            </Form>
        </>
    )
}

export default LoginForm