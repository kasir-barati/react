import { useContext } from "react";
import { MessageContext } from "../app/App";

export function NestedChild() {
  const message = useContext(MessageContext);

  return <h1>{message}</h1>;
}
