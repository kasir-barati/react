import { Child } from "../child/Child";
import { Layout } from "../../layout/Layout";

export function Home() {
  return (
    <Layout>
      <div>
        Welcome Home
        <Child />
      </div>
    </Layout>
  );
}
