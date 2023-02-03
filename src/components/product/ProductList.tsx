import { Link } from "react-router-dom";
import { Layout } from "../../layout/Layout";
import { Paper } from "@mui/material";

export function ProductList() {
  return (
    <Layout>
      <Paper
        sx={{
          padding: 1,
        }}
      >
        <Link to="/products/1">First Product</Link>
      </Paper>
    </Layout>
  );
}
