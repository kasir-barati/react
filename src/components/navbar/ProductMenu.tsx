import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";

export function ProductMenu({
  productAnchor,
  handleCloseProductMenu,
  productMenuLabel,
}: PropsWithChildren<{
  productAnchor: HTMLElement | null;
  handleCloseProductMenu: () => void;
  productMenuLabel: string;
}>) {
  alert(productMenuLabel);
  const open = Boolean(productAnchor);

  return (
    <Menu
      id="productMenu"
      anchorEl={productAnchor}
      open={open}
      onClose={handleCloseProductMenu}
      MenuListProps={{
        "aria-labelledby": productMenuLabel,
      }}
    >
      <MenuItem>
        <Link to="/products/search">Search</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/products/list">List</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/products/edit">Edit</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/products/add">Add</Link>
      </MenuItem>
    </Menu>
  );
}
