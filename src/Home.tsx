import { Child } from "./Child";
import { Layout } from "./Layout";

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
