import '@/assets/css/blog-styles.css'
import '@/assets/css/custom.css'
import { useEffect,useState } from 'react';
import { Outlet } from 'react-router-dom';
import AccountModal from '@/pages/home/account.modal';
import { useHeader } from '@/components/header';
import Menu from "@/pages/home/nav.menu"


const Blog = () => {
    const [modalType,setModalType] = useState("Login")
    const [accountModalShow, setAccountModalShow] = useState(false);
    const { headerData } = useHeader();

    useEffect(() => {
        if (!accountModalShow) {
          setModalType("Login"); // Reset modalType when modal is closed
        }
      }, [accountModalShow]);

    return (
        <>
        <Menu showLoginModal={() => setAccountModalShow(true)}/>
        {/* style="background-image: url('assets/img/home-bg.jpg')" */}
        <header className="masthead">
            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="site-heading">
                            <h1>{headerData.heading}</h1>
                            <span className="subheading">{headerData.subheading}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div className="">
            <Outlet />
            <AccountModal
                modalType={modalType}
                setModalType={setModalType}
                show={accountModalShow}
                onHide={() => setAccountModalShow(false)}
            />
        </div>
        <footer className="border-top">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <ul className="list-inline text-center">
                            <li className="list-inline-item">
                                <a href="#!">
                                    <span className="fa-stack fa-lg">
                                        <i className="fas fa-circle fa-stack-2x"></i>
                                        <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#!">
                                    <span className="fa-stack fa-lg">
                                        <i className="fas fa-circle fa-stack-2x"></i>
                                        <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#!">
                                    <span className="fa-stack fa-lg">
                                        <i className="fas fa-circle fa-stack-2x"></i>
                                        <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <div className="small text-center text-muted fst-italic">Copyright &copy; Your Website 2023</div>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}

export default Blog