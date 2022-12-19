import React from "react";
import { Close, HelpOutlineOutlined } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

const CreateAppBar = ({ title, close, helpEnabled }) => {
  return (
    <AppBar
      position="static"
      sx={{ boxShadow: "none", borderBottom: "2px solid #E3E8EB" }}
    >
      <Toolbar sx={{ px: 3 }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => {
            close();
          }}
        >
          <Close fontSize="medium" htmlColor="#4B4749" />
        </IconButton>
        <Typography
          variant="h2"
          component="div"
          sx={{
            flexGrow: 1,
            pr: !helpEnabled ? "36px!important" : "0px",
          }}
        >
          {title}
        </Typography>
        {helpEnabled && (
          <IconButton>
            <HelpOutlineOutlined />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default CreateAppBar;
