import React from "react";
import {
  BusinessCenterOutlined,
  PeopleOutlined,
  TrendingUp,
} from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HomeAppBar } from "../Appbar";
import LandingInfo from "../landingInfo";
import store from "../../store/store";
import { STORE_KEYS } from "../../store/constant";

const Dashboard1 = () => {
  const navigate = useNavigate();
  const [, setEnterprises] = store.useState(STORE_KEYS.id.enterprises);

  const newHandler = () => {
    navigate("/create");
  };

  const joinHandler = () => {
    setEnterprises((prev) => {
      prev.joined = false;
      return prev;
    });
  };

  return (
    <>
      <HomeAppBar />
      <Grid
        container
        component="main"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          padding: "0px 27px",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            marginTop: "24px",
            fontSize: "18px",
            lineHeight: "22px",
          }}
        >
          Transform your company into a World Enterprise
        </Typography>
        <Grid
          sx={{
            marginTop: "30px",
          }}
        >
          <LandingInfo
            Icon={BusinessCenterOutlined}
            title="Add a Company"
            content="Create a new World Enterprise or Transform your existing company into a World Enterprise"
            sx={{}}
            color="#4B4749"
          />
          <LandingInfo
            Icon={PeopleOutlined}
            title="Invite Shareholders"
            content="Invite shareholders to become member of the World Enterprise"
            sx={{ marginTop: "26px" }}
            color="#FF6142"
          />
          <LandingInfo
            Icon={TrendingUp}
            title="Add a Company"
            content="Issue or transfer your custom Enterprise ERC20 tokens to other shareholders"
            sx={{ marginTop: "26px" }}
            color="#3D61B0"
          />
        </Grid>
        <Button
          fullWidth
          sx={{
            marginTop: "54px",
          }}
          onClick={newHandler}
        >
          Create a World Enterprise
        </Button>
        <Button
          fullWidth
          sx={{ mt: 3 }}
          onClick={joinHandler}
          variant="outlined"
        >
          Join a World Enterprise
        </Button>
      </Grid>
    </>
  );
};

export default Dashboard1;
