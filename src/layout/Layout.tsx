import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const marginX = { margin: "0 5px 0 5px" };

export function Layout({ children }: PropsWithChildren) {
  const isAuthenticated = useAuth();

  return (
    <>
      <div>
        <Link style={marginX} to="/" about="Home page">
          Home
        </Link>
        <Link style={marginX} to="/contact-us" about="Contact us page">
          Contact Us
        </Link>
        <Link style={marginX} to="/products">
          Products
        </Link>
        <Link style={marginX} to="/signin">
          Singin
        </Link>
        <Link style={marginX} to="/dashboard" hidden={!isAuthenticated}>
          Dashboard
        </Link>
      </div>
      {children}
    </>
  );
}
