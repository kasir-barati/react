import { useContext } from "react";
import { Typography } from "@mui/material";
import { MessageContext } from "../app/App";

export function NestedChild() {
  const message = useContext(MessageContext);

  return <Typography variant="h1">{message}</Typography>;
}
