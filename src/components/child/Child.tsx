import { useContext } from "react";
import { MessageContext } from "../app/App";
import { NestedChild } from "./NestedChild";

export function Child() {
  const message = useContext(MessageContext);

  return (
    <div>
      {message}
      <NestedChild />
    </div>
  );
}
