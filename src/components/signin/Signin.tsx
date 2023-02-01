import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../layout/Layout";
import { User } from "../../types";

export function Signin() {
  const navigate = useNavigate();
  const [email, setEmailState] = useState("");
  const handleSignin = () => {
    const user: User = { email: email, isAuthenticated: true };
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard");
  };

  return (
    <Layout>
      email:{" "}
      <input
        type="text"
        onChange={(e) => {
          setEmailState(e.currentTarget.value);
        }}
      ></input>
      password: <input type="password"></input>
      <input type="button" onClick={handleSignin} value="signin"></input>
    </Layout>
  );
}
