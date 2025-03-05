import Container from 'react-bootstrap/Container';
import {useState, memo} from "react"
import Collapse  from 'react-bootstrap/Collapse'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import LoginImg from "@/assets/img/login.svg"
import {auth} from '@/utils/cookie'
import { loginCheck,UserLogOut } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';



type MenuItem = {
  title: string,
  items?: MenuItem[],
  link?:string
}

interface ExpandedState {
  [key: string]: boolean;
}

type Props = {
  showLoginModal:(() => void) | undefined
  loginState?:boolean | undefined
}

const LoginIcon = memo(({ showLoginModal, loginState }: Props) => {
  if (loginState){
    return (
      <>
        <Nav.Link onClick={async () => {
          await UserLogOut();
          window.location.reload();
        }}>
          Log out
        </Nav.Link>
      </>
    )
  }else{
    return (
      <>
        <Nav.Link onClick={showLoginModal}>
          <img src={LoginImg} alt="Login" /> Login
        </Nav.Link>
      </>
    )
  }
});

const Menu = ({showLoginModal}:Props) => {

  const expandMenu = false;
  let menuItems:MenuItem[]
  const [expanded, setExpanded] = useState<ExpandedState>({});
  
  const loginStatusQuery = useQuery({
    queryKey: ['loginStatus'],
    queryFn: loginCheck,
    // Refetch every 5 minutes
    refetchInterval: 5 * 60 * 1000,
  });

  if (loginStatusQuery.data){
    menuItems = [
      { title: 'Home', link: '/home' },
      {
        title: 'Recipes',
        items: [
          { title: 'Recipe List', link: '/recipe/collection' },
          { title: 'Create Recipe', link: '/recipe/create' },
        ],
      },
      { title: 'Store', link: '/store' },
    ];
  }else{
    menuItems = [
      { title: 'Home', link: '/home' },
      {
        title: 'Recipes',
        items: [
          { title: 'Recipe List', link: '/recipe/collection' },
        ],
      },
      { title: 'Store', link: '/store' },
    ];
  }
  
  const toggleExpand = (title:string) => {
      setExpanded(prev => ({
          ...prev,
          [title]: !prev[title]
      }));
  };

  const renderTitle = (item: MenuItem) => {
    if (item.items) {
      return (
        <>
          {item.title}
          <span className="ms-2">
            {expanded[item.title] ? '›' : '›'}
          </span>
        </>
      );
    }
    return <>{item.title}</>;
  }
  
  return (
    <>
        <Navbar fixed='top' key={`menu-${expandMenu}`} expand={expandMenu} className="bg-body-tertiary mb-2">
          <Container>
            <Navbar.Brand >
              <div className='d-flex'>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expandMenu}`} />
              <h3>LazyP</h3>
              </div>
            </Navbar.Brand>
            <LoginIcon showLoginModal={showLoginModal} loginState={loginStatusQuery.data}/>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expandMenu}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expandMenu}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expandMenu}`}>
                  LazyP
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="flex-column">
                    {menuItems.map((item) => (
                        <div key={`item-${item.title}`}>
                            <Nav.Link 
                                onClick={() => item.items && toggleExpand(item.title)}
                                className="d-flex justify-content-between align-items-center py-3 px-3 border-bottom"
                                href={item.link}
                            >
                                {renderTitle(item)}
                            </Nav.Link>
                            
                            {item.items && (
                                <Collapse in={expanded[item.title]}>
                                    <div>
                                        <Nav className="flex-column">
                                            {item.items.map((subItem) => (
                                                <Nav.Link 
                                                    key={`sub-item-${subItem.title}`}
                                                    className="py-2 px-4 border-bottom"
                                                    href={subItem.link}
                                                >
                                                    {subItem.title}
                                                </Nav.Link>
                                            ))}
                                        </Nav>
                                    </div>
                                </Collapse>
                            )}
                        </div>
                    ))}
                    {auth.isAuthenticated() && (<>
                      <Nav.Link 
                        onClick={() => toggleExpand("Account")}
                        className="d-flex justify-content-between align-items-center py-3 px-3 border-bottom"
                      >
                        Account
                      </Nav.Link>
                      <Collapse in={expanded["Account"]}>
                        <div>
                            <Nav className="flex-column">  
                              <Nav.Link 
                                className="py-2 px-4 border-bottom"
                                href="/recipe/list"
                              >
                                  My Recipe
                              </Nav.Link>
                            </Nav>
                        </div>
                      </Collapse>
                      <Collapse in={expanded["Account"]}>
                        <div>
                            <Nav className="flex-column">
                                
                              <Nav.Link 
                                className="py-2 px-4 border-bottom"
                                href="/account"
                              >
                                Change Information
                              </Nav.Link>
                                
                            </Nav>
                        </div>
                      </Collapse>
                      <Collapse in={expanded["Account"]}>
                        <div>
                            <Nav className="flex-column">
                                
                              <Nav.Link 
                                className="py-2 px-4 border-bottom"
                                href="/password"
                              >
                                Change Password
                              </Nav.Link>
                                
                            </Nav>
                        </div>
                      </Collapse>
                    </>)}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      
    </>
  );
}

export default memo(Menu) ;
