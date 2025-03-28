import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios,{AxiosError} from 'axios';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';
import { ErrorResponse,parseErrors } from '@/utils/error';
import swAlert from "@/components/alert"
import { useMutation } from '@tanstack/react-query';



type loginInput = {
    email: string,
    password: string
}

interface Props{
  onHide:(() => void),
}

const loginUser = async (credentials:loginInput) => {
  const response = await axios.post(import.meta.env.VITE_API_URL+'/login', credentials,{
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  return response.data;
};

const LoginForm = (props:Props) => {

  const mutation =  useMutation({
    mutationFn: loginUser,
    onSuccess: async () => {
      props.onHide()
      setAlert(null)
      setFormData({ email: '', password: ''});
      setError({ email: '', password: ''});
      await swAlert.confirm({title:"Success",content:"Login success"});
      window.location.reload();
    },
    onError: (err) => {
      if (err instanceof AxiosError){
        let errorMsg :ErrorResponse = err.response?.data
        const errorMap = parseErrors(errorMsg);
        setAlert(errorMsg.message)
        setError({...errorMap})
      }else{
        setAlert(err instanceof Error ? err.message : 'An error occurred');
      }
    }
  });

  const [error, setError] = useState<Partial<loginInput>>({
    email: '',
    password: ''
  });
  const [alert, setAlert] = useState<string | null>(null);
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
    mutation.mutate(formData)
    setError({
      email: "",
      password: ""
    });
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
                  <Button type="submit" variant="success" disabled={mutation.isPending}>Send</Button>
              </div>
          </Form>
      </>
  )
}

export default LoginForm