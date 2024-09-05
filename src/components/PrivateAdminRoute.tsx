import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateAdminRoute = ({ children }: PrivateRouteProps) => {
  const isAuth = localStorage.getItem("isAdminLogin") === "true";

  return isAuth ? <>{children}</> : <Navigate to="/admin_login" />;
};

export default PrivateAdminRoute;
