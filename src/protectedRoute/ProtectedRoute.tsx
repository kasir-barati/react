import { Outlet } from "react-router-dom";
import { Signin } from "../signin/Signin";

const useAuth = () => {
  const user = { isAuthenticated: false };
  return user && user.isAuthenticated;
};

export function ProtectedRoute() {
  const isAuthenticated = useAuth();

  return isAuthenticated ? <Outlet /> : <Signin />;
}
