import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export function Layout({ children }: PropsWithChildren) {
  const marginX = { margin: "0 5px 0 5px" };

  return (
    <>
      <div>
        <Link style={marginX} to="/" about="Home page">
          Home
        </Link>
        <Link style={marginX} to="/contact-us" about="Contact us page">
          Contact Us
        </Link>
      </div>
      {children}
    </>
  );
}
