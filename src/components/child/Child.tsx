import { useContext } from "react";
import { Stack } from "@mui/system";
import { MessageContext } from "../app/App";
import { NestedChild } from "./NestedChild";

export function Child() {
  const message = useContext(MessageContext);

  return (
    <Stack>
      {message}
      <NestedChild />
    </Stack>
  );
}
