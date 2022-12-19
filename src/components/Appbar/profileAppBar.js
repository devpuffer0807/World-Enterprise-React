import React, { useState } from "react";
import { AccountCircle, ArrowBack, Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useLocation } from "react-router-dom";

const ProfileAppBar = ({
  logo,
  name,
  ID,
  back,
  SecondIcon,
  secondAction,
  secondComponent,
}) => {
  const location = useLocation();
  const { deactivate } = useWeb3React();

  const [anchorEl, setAnchorEl] = useState(null);

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
    <Box
      component="header"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: "#FFDB0A", pt: 6, pb: 10 }}
    >
      <IconButton
        sx={{ position: "absolute", left: "10px", top: "40px" }}
        onClick={() => {
          back();
        }}
      >
        <ArrowBack />
      </IconButton>
      <Box sx={{ position: "absolute", right: "10px", top: "40px", p: 0 }}>
        {SecondIcon && (
          <IconButton
            onClick={() => {
              if (secondAction) secondAction();
            }}
          >
            <SecondIcon />
          </IconButton>
        )}
        {location.pathname === "/[wepID]/dashboard" && (
          <>
            <IconButton onClick={handleMenu}>
              <AccountCircle />
            </IconButton>
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
          </>
        )}
      </Box>
      <Box sx={{ p: 0, position: "absolute", right: "10px", top: "40px" }}>
        {secondComponent}
      </Box>
      <Avatar sx={{ width: "54px", height: "54px" }}>
        {logo !== "" ? (
          <Box component="img" src={logo} sx={{ width: "100%" }} />
        ) : (
          <Person sx={{ width: "29px", height: "29px" }} htmlColor="#4B4749" />
        )}
      </Avatar>
      <Typography
        variant="h2"
        sx={{ fontSize: "16px", lineHeight: "20px", mt: "10px" }}
      >
        {name}
      </Typography>
      <Typography
        variant="h3"
        sx={{
          fontSize: "12px",
          fontWeight: "500",
          lineHeight: "15px",
          textAlign: "center",
          mt: "3px",
        }}
      >
        {`Wep ${ID}`}
      </Typography>
    </Box>
  );
};

export default ProfileAppBar;
