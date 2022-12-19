import React from "react";
import { Add, ArrowBack, HelpOutlineOutlined } from "@mui/icons-material";
import {
  AppBar as MuiAppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

const AppBar = ({ title, back, handle, type, position }) => {
  return (
    <MuiAppBar
      position={position}
      sx={{ boxShadow: "none", borderBottom: "2px solid #E3E8EB" }}
    >
      <Toolbar sx={{ px: 3, pt: 3 }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => {
            back();
          }}
        >
          <ArrowBack fontSize="medium" htmlColor="#4B4749" />
        </IconButton>
        <Typography
          variant="h2"
          component="div"
          sx={{
            flexGrow: 1,
            pr: type === "none" ? "36px!important" : "0px",
          }}
        >
          {title}
        </Typography>
        {(type === "add" || type === "help") && (
          <IconButton
            onClick={() => {
              if (handle !== undefined) handle();
            }}
          >
            {type === "add" && <Add />}
            {type === "help" && <HelpOutlineOutlined />}
          </IconButton>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
