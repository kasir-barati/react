import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContactUs } from "./ContactUs";
import { Home } from "./Home";
import { Dashboard } from "./dashboard";
import { ProtectedRoute } from "./protectedRoute/ProtectedRoute";
import { Product } from "./product/Product";
import { ProductEdit } from "./product/ProductEdit";
import { ProductList } from "./product/ProductList";
import { ProductSearch } from "./product/ProductSearch";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contact-us" element={<ContactUs />}></Route>
        <Route path="/products" element={<ProductList />}>
          <Route path="search" element={<ProductSearch />}></Route>
          <Route path=":id" element={<Product />}></Route>
          <Route path="edit" element={<ProductEdit />}></Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
