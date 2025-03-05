import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import LoginForm from '@/pages/home/login.form';
import { Col, Row } from 'react-bootstrap';
import ForgotPasswordForm from '@/pages/home/forgotpwd.form';
import RegisterForm from '@/pages/home/register.form';

interface Props{
    modalType:string,
    setModalType:((newModal: string) => void) ,
    show: boolean,
    onHide:(() => void) | undefined
}

const AccountModal = ({modalType,setModalType,show,onHide}:Props) => {
    const renderForm =() =>{

        switch (modalType) {
            case 'Login':

                return (
                    <>
                        <LoginForm onHide={() => onHide}></LoginForm>
                        <Form.Group className="mb-3">
                        <Row>
                            <Col> <a className='mock-click' onClick={() => setModalType("Register")}>Sign up</a> </Col>
                            <Col> <a className='mock-click' onClick={() => setModalType("Forgot Password")}>Forgot password</a> </Col>
                        </Row>
                        </Form.Group>
                    </>
                );
            case 'Register':
                return (
                    <>
                        <RegisterForm onHide={() => onHide}/>
                    </>
                );
            case 'Forgot Password':
                return (
                    <>
                        <ForgotPasswordForm onHide={() => onHide}/>
                    </>
                );
        }
    }


    return (
        <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {modalType}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {renderForm()}
        </Modal.Body>
    </Modal>
  );
}

export default AccountModal;