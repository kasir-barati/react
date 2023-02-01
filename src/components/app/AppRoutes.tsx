import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContactUs } from "../contactUs/ContactUs";
import { Home } from "../home/Home";
import { Dashboard } from "../dashboard/index";
import { ProtectedRoute } from "../protectedRoute/ProtectedRoute";
import { Product } from "../product/Product";
import { ProductEdit } from "../product/ProductEdit";
import { ProductList } from "../product/ProductList";
import { ProductSearch } from "../product/ProductSearch";
import { Signin } from "../signin/Signin";
import { AddProduct } from "../product/AddProduct";

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
          <Route path="add" element={<AddProduct />}></Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route path="/signin" element={<Signin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
