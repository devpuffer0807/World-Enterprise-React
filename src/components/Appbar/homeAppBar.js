import React from "react";
import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";

const HomeAppBar = () => {
  const { account, deactivate } = useWeb3React();

  const [anchorEl, setAnchorEl] = (useState < null) | (HTMLElement > null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDisconnect = () => {
    handleClose();
    deactivate();
  };

  return (
    <Container sx={{ width: "100%", m: 0, maxWidth: "5000px!important" }}>
      <AppBar
        component="div"
        position="static"
        sx={{ boxShadow: "none", px: 0, py: 2 }}
      >
        <Toolbar sx={{ px: "0!important" }}>
          <Typography
            variant="h1"
            component="div"
            sx={{ flexGrow: 1, px: "0!important" }}
          >
            World Enterprise
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2, p: 0 }}
            onClick={handleMenu}
          >
            {account ? (
              <AccountCircle fontSize="large" />
            ) : (
              <MenuIcon fontSize="large" />
            )}
          </IconButton>
          {account && (
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
            </Menu>
          )}
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default HomeAppBar;
