import { Link as ReactRouterLinkRouter } from "react-router-dom";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { Stack, SxProps } from "@mui/system";
import { useAuth } from "../../hooks/useAuth";
import { setProductAnchorStore } from "./Navbar.store";
import React from "react";
import { ProductMenu } from "./ProductMenu";

export function Navbar() {
  const isAuthenticated = useAuth();
  const { state, action } = setProductAnchorStore();
  const handleProductMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    alert(state.productAnchor.get()?.TEXT_NODE);
    action.setProductAnchor(event.currentTarget);
    alert(state.productAnchor.get()?.TEXT_NODE);
  };
  const productMenuLabel = "productButton";
  const handleCloseProductMenu = () => {
    action.setProductAnchor(null);
  };
  const linkSx: SxProps = {
    color: "white",
    textDecoration: "none",
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit">
          <WhatshotIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Fire app
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            sx={linkSx}
            component={ReactRouterLinkRouter}
            to="/"
            about="Home page"
          >
            Home
          </Button>
          <Button
            sx={linkSx}
            component={ReactRouterLinkRouter}
            to="/contact-us"
            about="Contact us page"
          >
            Contact Us
          </Button>
          <Button sx={linkSx} id={productMenuLabel} onClick={handleProductMenu}>
            Products
          </Button>
          <Button sx={linkSx} component={ReactRouterLinkRouter} to="/signin">
            Singin
          </Button>
          {isAuthenticated && (
            <Button
              sx={linkSx}
              component={ReactRouterLinkRouter}
              to="/dashboard"
            >
              Dashboard
            </Button>
          )}
        </Stack>
        <ProductMenu
          handleCloseProductMenu={handleCloseProductMenu}
          productAnchor={null}
          productMenuLabel={productMenuLabel}
        />
      </Toolbar>
    </AppBar>
  );
}
