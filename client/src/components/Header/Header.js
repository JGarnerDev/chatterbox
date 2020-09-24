import React from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";

import { Menu, CloseRounded } from "@material-ui/icons";

const Header = ({ room }) => (
  <AppBar position="static" id="Header">
    <Toolbar id="header-wrapper">
      <IconButton edge="start" aria-label="menu">
        <Menu />
      </IconButton>
      <Typography variant="h6">{room}</Typography>
      <IconButton edge="end" href="/">
        <CloseRounded />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default Header;
