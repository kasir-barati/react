import { useParams } from "react-router-dom";
import { Stack } from "@mui/system";

export function Product() {
  const { id } = useParams();

  return <Stack>product #{id}</Stack>;
}
