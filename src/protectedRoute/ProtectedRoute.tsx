import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Signin } from "../signin/Signin";

export function ProtectedRoute() {
  const isAuthenticated = useAuth();

  return isAuthenticated ? <Outlet /> : <Signin />;
}
