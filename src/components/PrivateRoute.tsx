import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuth = localStorage.getItem("isLogin") === "true";

  return isAuth ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
