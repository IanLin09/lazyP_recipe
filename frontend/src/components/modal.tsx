import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import LoginForm from '@/components/login.form.tsx';


interface Props{
    show: boolean,
    modal: 'login' | 'register' | 'forgot-password',
    onHide:(() => void) | undefined
}


const AccountModal = (props:Props) => {
    const headerText = props.modal === 'login'
        ? 'Login'
        : props.modal === 'register'
        ? 'Register'
        : 'Forgot Password'

    const renderForm =() =>{
        const modalType = props.modal;

        switch (modalType) {
            case 'login':

                return (
                    <LoginForm onHide={() => props.onHide}></LoginForm>
                );
            case 'register':
                return (
                    <>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        
                    </>
                );
            case 'forgot-password':
                return (
                    <>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                    </>
                );
        }
    }

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {headerText}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {renderForm()}
        </Modal.Body>
    </Modal>
  );
}

export default AccountModal;