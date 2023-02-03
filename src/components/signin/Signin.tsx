import { Button, Grid, TextField } from "@mui/material";
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
      <Grid container spacing={2} marginY={1}>
        <Grid item sm={12} md={6}>
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            onChange={(e) => {
              setEmailState(e.currentTarget.value);
            }}
            error={!email}
            helperText={!email && "Enter your email"}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            helperText="Never share your password, and reuse old ones"
          />
        </Grid>
        <Grid item sm={12} md={12}>
          <Button
            sx={{ boxShadow: "3px 3px 3px black" }}
            variant="outlined"
            fullWidth
            onClick={handleSignin}
          >
            Signin
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
}
