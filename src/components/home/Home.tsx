import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { Child } from "../child/Child";
import { Layout } from "../../layout/Layout";

export function Home() {
  return (
    <Layout>
      <Stack>
        <Typography variant="h1">Welcome Home</Typography>
        <Child />
      </Stack>
    </Layout>
  );
}
