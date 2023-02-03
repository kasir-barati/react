import React, { useMemo, useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Stack,
  TextField,
  InputAdornment,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Rating,
  Typography,
  Grid,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PreviewIcon from "@mui/icons-material/Preview";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import { addProductStore } from "./AddProduct.store";

export function AddProduct() {
  const { state, action } = useMemo(() => addProductStore(), []);
  const [name, setNameState] = useState("");
  const [price, setPriceState] = useState("");
  const [rating, setRatingState] = useState<number | null>();
  const [termsOfService, setTermOfServiceState] = useState(false);

  return (
    <Stack width="960px" spacing={4}>
      <Stack>
        <Grid container spacing={2}>
          <Grid item sm={12} md={8}>
            <Stack spacing={2}>
              <Box>
                <TextField
                  fullWidth={true}
                  label="name"
                  required
                  variant="outlined"
                  onChange={(e) => setNameState(e.currentTarget.value)}
                  type="text"
                  error={!name}
                  helperText={!name && "Please enter product name"}
                ></TextField>
              </Box>
              <Box>
                <TextField
                  label="price"
                  fullWidth={true}
                  required
                  onChange={(e) => setPriceState(e.currentTarget.value)}
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CurrencyYenIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={!price}
                  helperText={
                    !price &&
                    "Price cannot be empty or negative, but it can be floating point"
                  }
                ></TextField>
              </Box>
              <Box>
                <FormControl fullWidth={true}>
                  <FormLabel id="isProductAvailableGroupLabel">
                    Is it available?
                  </FormLabel>
                  <RadioGroup
                    name="isProductAvailable"
                    aria-labelledby="isProductAvailableGroupLabel"
                    row
                  >
                    <FormControlLabel
                      control={<Radio size="small" />}
                      label="Available"
                      value="available"
                    ></FormControlLabel>
                    <FormControlLabel
                      control={<Radio size="small" />}
                      label="Not Available"
                      value="notAvailable"
                    ></FormControlLabel>
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box>
                <FormControlLabel
                  label="I accept terms of service"
                  control={
                    <Checkbox
                      checked={termsOfService}
                      onClick={() => setTermOfServiceState(!termsOfService)}
                    />
                  }
                />
              </Box>
            </Stack>
          </Grid>
          <Grid item sm={12} md={4}>
            <Box>
              <Typography variant="body1">
                Please tell users how favorite is this product :evil_smile:
              </Typography>
              <Rating
                value={rating}
                onChange={(e, newValue) => setRatingState(newValue)}
              />
            </Box>
          </Grid>
        </Grid>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="success"
          onClick={(e) => action.addProduct({ name, price })}
          size="medium"
          startIcon={<SaveIcon />}
        >
          Add
        </Button>
        <Button
          variant="contained"
          color="info"
          size="medium"
          onClick={(e) =>
            alert(
              `Id: ${state.product.get()?.id}, name: ${
                state.product.get()?.name
              }, price: ${state.product.get()?.price}`
            )
          }
          startIcon={<PreviewIcon />}
        >
          Show added product
        </Button>
      </Stack>
    </Stack>
  );
}
