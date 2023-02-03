import React, { createContext, StrictMode } from "react";
import { Stack } from "@mui/system";
import "./App.css";
import { AppRoutes } from "./AppRoutes";

export const MessageContext = createContext("Some value");

function App() {
  return (
    <StrictMode>
      <Stack>
        <AppRoutes />
      </Stack>
    </StrictMode>
  );
}

export default App;
