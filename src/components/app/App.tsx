import React, { createContext, StrictMode } from "react";
import "./App.css";
import { AppRoutes } from "./AppRoutes";

export const MessageContext = createContext("Some value");

function App() {
  return (
    <StrictMode>
      <div className="App">
        <AppRoutes />
      </div>
    </StrictMode>
  );
}

export default App;
