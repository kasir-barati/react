import { Button, Stack, TextField } from "@mui/material";

export function ProductSearch() {
  return (
    <Stack alignItems="start" spacing={2}>
      <TextField
        fullWidth
        label="Type something"
        helperText="Name, description, whatever"
      />
      <Button variant="contained">Search</Button>
    </Stack>
  );
}
