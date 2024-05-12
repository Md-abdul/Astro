

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuList,
  Toolbar,
  Typography,
  MenuItem,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
const pages = ["Home", "skjfk", "skjfksjl"];

export const Navbar = () => {
  const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorNav(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorNav(null);
  };

  return (
    <>
      <AppBar>
        <Toolbar>
           
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <TempleBuddhistIcon />
          </IconButton>
          {/* <Link to={'/'} style={{ textDecoration: "none", color: "white" }}> */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            Astrologers
          </Typography>
          {/* </Link> */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Link
              to={"/"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="inherit">Astrologers</Button>
            </Link>

            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="inherit">Register</Button>
            </Link>
            
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={openMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              open={Boolean(anchorNav)}
              onClose={closeMenu}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <MenuList>
              <MenuItem>
                  {" "}
                  <Link
                    to={"/"}
                    style={{ textDecoration: "none", color: "red" }}
                  >
                    All Astrologers
                  </Link>
                </MenuItem>

                <MenuItem>
                  {" "}
                  <Link
                    to={"/register"}
                    style={{ textDecoration: "none", color: "red" }}
                  >
                    Register
                  </Link>
                </MenuItem>
                
              </MenuList>
            </Menu>
          </Box>
         
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              {/* <TempleBuddhistIcon /> */}
            </IconButton>
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              Astrologers
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
};
