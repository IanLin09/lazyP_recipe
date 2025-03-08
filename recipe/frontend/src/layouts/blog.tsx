import '@/assets/css/blog-styles.css'
import '@/assets/css/custom.css'
import { useEffect,useState,Suspense,useCallback ,memo} from 'react';
import { Outlet } from 'react-router-dom';
import AccountModal from '@/pages/home/account.modal';
import Menu from "@/pages/home/nav.menu"
import { useLocation } from 'react-router-dom';


const Header = memo(()=>{

    const location = useLocation();

    const getHeaderText = (pathname:string) => {
        let path = pathname.split('/');
        if (/^\d+$/.test(path[path.length-1])){
            pathname = path.slice(0, -1).join('/');
        }
        
        switch(pathname) {
            case '/recipe/collection':
                return (
                    <>
                        <h1>Recipes</h1>
                        <span className="subheading">Find your favorite recipes here</span>
                    </>
                );
            
            case '/recipe/create':
            case '/recipe/edit':
            
            return (
                <>
                    <h1>Share Recipe</h1>
                    <span className="subheading">I am so pround of my secret recipe</span>
                </>
            );
            case '/recipe/list':
                return (
                    <>
                        <h1>My Recipes</h1>
                        <span className="subheading">View your recipe and collection</span>
                    </>
                );
            case '/recipe':
                return (
                    <>
                        <h1>Recipes</h1>
                        <span className="subheading">Here's the magic happen</span>
                    </>
                );
            case '/account':
            case '/password':
                return (
                    <>
                        <h1>Account Info</h1>
                    </>
                );
            case '/store':
                return (
                    <>
                        <h1>Store</h1>
                        <span className="subheading">Store location and information</span>
                    </>
                );
          default:
            return (
                <>
                    <h1>LazyP</h1>
                    <span className="subheading">For the people who think cooking spend to much time.</span>
                </>
                
            );
        }
      };

    return (
        <>
            {getHeaderText(location.pathname)}
        </>
    )
})

const Blog = () => {
    const [modalType,setModalType] = useState("Login")
    const [accountModalShow, setAccountModalShow] = useState(false);
    const changeModalTypeFn = useCallback((newModal:string) => setModalType(newModal), []);
    const closeModalFn = useCallback(() => setAccountModalShow(false), []);
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
                            <Header/>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div className="">
            <Suspense>
                <Outlet />
            </Suspense>
            <AccountModal
                modalType={modalType}
                setModalType={changeModalTypeFn}
                show={accountModalShow}
                onHide={closeModalFn}
            />
        </div>
        <footer className="border-top">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <ul className="list-inline text-center">
                            <li className="list-inline-item">
                                <a target="_blank" href="https://www.linkedin.com/in/ian-lin-208b34246/">
                                    <span className="fa-stack fa-lg">
                                        <i className="fas fa-circle fa-stack-2x"></i>
                                        <i className="fab fa-linkedin fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a target="_blank" href="https://github.com/IanLin09/lazyP_recipe">
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