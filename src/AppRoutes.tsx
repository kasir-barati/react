import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContactUs } from "./ContactUs";
import { Home } from "./Home";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contact-us" element={<ContactUs />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
