import React from "react";
import { Box, Avatar, Container, Typography } from "@mui/material";

const LandingInfo = ({ Icon, title, content, sx, color }) => {
  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Avatar>
        <Icon fontSize="medium" htmlColor={color} />
      </Avatar>
      <Container
        sx={{
          flex: 1,
          minWidth: "54px",
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          verticalAlign: "middle",
        }}
      >
        <Typography variant="h3">{title}</Typography>
        <Typography variant="body1" sx={{ marginTop: "5px" }}>
          {content}
        </Typography>
      </Container>
    </Box>
  );
};

export default LandingInfo;
