import { createContext, useContext, useState, ReactNode } from 'react';
import { UserDTO } from '@/utils/dto.tsx';


interface LoginContextType {
  setLogin: (data:UserDTO) => void;
  setLogout: () => void,
  getLoginData:() => UserDTO | undefined; 
  loginData: UserDTO| undefined;
}

const LoginContext = createContext<LoginContextType>({
  setLogin: () => {},
  setLogout: () => {},
  getLoginData:() =>{return {email:""}},
  loginData: {email:""}
});

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [loginData, setLoginData] = useState<UserDTO>();

  const setLogin = (data: UserDTO) => {
    setLoginData(data);
  };

  const setLogout = () => {
    setLoginData(undefined)
  }

  const getLoginData = () => {
    return loginData;
  }

  return (
    <LoginContext.Provider value={{ setLogin,getLoginData, setLogout,loginData }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);