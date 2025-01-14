import '@/assets/css/blog-styles.css'
import '@/assets/css/custom.css'
import { useEffect,ReactNode,useState } from 'react';
import { Outlet,useMatches } from 'react-router-dom';
import AccountModal from '@/components/modal';
import { auth } from "@/utils/cookie"
import  { RouteHandle } from '@/utils/dto';
import { useHeader } from '@/components/header';

interface Props {
    children?: ReactNode
}

const Blog = ({children}:Props) => {
    const [accountModalShow, setAccountModalShow] = useState(false);
    const [modalMode, setModalMode] = useState<'login' | 'register' | 'forgot-password'>('login');
    const { headerData } = useHeader();

    useEffect(() => {
        let scrollPos = 0;
        const mainNav = document.getElementById('mainNav');
        const headerHeight = mainNav?.clientHeight || 0;
    
        const handleScroll = () => {
            const currentTop = document.body.getBoundingClientRect().top * -1;
            
            if (mainNav) {
                if (currentTop < scrollPos) {
                    // Scrolling Up
                    if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                        mainNav.classList.add('is-visible');
                    } else {
                        mainNav.classList.remove('is-visible', 'is-fixed');
                    }
                } else {
                    // Scrolling Down
                    mainNav.classList.remove('is-visible');
                    if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                        mainNav.classList.add('is-fixed');
                    }
                }
                scrollPos = currentTop;
            }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function accountModalClickHandler(){
        setAccountModalShow(true)
    }

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="/app">LazyP</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto py-4 py-lg-0">
                        <li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" href="index.html">Home</a></li>
                        <li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" href="/recipe/list">Recipe</a></li>
                        <li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" href="post.html">Grocery</a></li>
                        {auth.isAuthenticated() &&<li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" href="contact.html">Account</a></li>}
                        <li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" role="button" onClick={accountModalClickHandler}>Login</a></li>
                        {!auth.isAuthenticated() && <li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" role="button" onClick={accountModalClickHandler}>Login</a></li>}
                    </ul>
                </div>
            </div>
        </nav>
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
                modal={modalMode}
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