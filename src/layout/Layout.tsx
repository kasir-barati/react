import { PropsWithChildren } from "react";
import { Stack } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { Navbar } from "../components/navbar/Navbar";

export function Layout({ children }: PropsWithChildren) {
  const isAuthenticated = useAuth();

  return (
    <Stack>
      <Navbar />
      {children}
    </Stack>
  );
}
