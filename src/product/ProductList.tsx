import { Link, Outlet } from "react-router-dom";
import { Layout, marginX } from "../Layout";

export function ProductList() {
  return (
    <Layout>
      <div>
        <Link style={marginX} to="/products/search">
          Search
        </Link>
        <Link style={marginX} to="/products/list">
          List
        </Link>
        <Link style={marginX} to="/products/edit">
          Edit
        </Link>
      </div>

      <Link to="/products/1">First Product</Link>

      <Outlet />
    </Layout>
  );
}
