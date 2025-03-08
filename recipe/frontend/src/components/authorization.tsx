import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { loginCheck } from "@/utils/axios";
import { LoadingScene } from './loading';

const Authorization = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  
  const { data: isAuthenticated, isLoading } = useQuery({
    queryKey: ["authStatus"],
    queryFn: loginCheck,
    staleTime: 1000 * 60 * 60, //60 mins
  });

  if (isLoading) {
    return <LoadingScene></LoadingScene>
  }

  if (!isAuthenticated) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return children;
};

export default Authorization;
