import { Layout } from "../Layout";

export function Signin() {
  return (
    <Layout>
      email: <input type="text"></input>
      password: <input type="password"></input>
      <input type="button" value="signin"></input>
    </Layout>
  );
}
