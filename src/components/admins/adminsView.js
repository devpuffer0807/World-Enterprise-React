import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import { AppBar } from "../Appbar";
import AdminsList from "./adminsList";

import store from "../../store/store";
import { STORE_KEYS, STEP } from "../../store/constant";

const AdminsView = () => {
  const navigation = useNavigate();

  const [enterprises] = store.useState(STORE_KEYS.id.enterprises);
  const admins = enterprises.enterprises.tempEnterprise.admins;
  const location = useLocation();
  const state = location.state;

  const [stepState, setStep] = store.useState(STORE_KEYS.id.step);

  const backHandler = () => {
    if (stepState === STEP.CREATE_ADMINS_VIEW) {
      setStep(STEP.CREATE_SHAREHOLDERS_VIEW);
    } else {
      const wepID = state.wepID;

      navigation(`/${wepID}/dashboard`);
    }
  };

  const addHandler = () => {
    if (stepState === STEP.CREATE_ADMINS_VIEW) {
      setStep(STEP.CREATE_ADMIN_ADD);
    } else {
      setStep(STEP.ADMIN_ADD);
    }
  };

  const continueHandler = () => {
    if (stepState === STEP.CREATE_ADMINS_VIEW) {
      setStep(STEP.CREATE_PROCESSING);
    }
  };

  return (
    <>
      <AppBar
        position="absolute"
        title="Admins"
        back={backHandler}
        type={admins.length === 0 ? "none" : "add"}
        handle={admins.length === 0 ? undefined : addHandler}
      />
      <Grid
        container
        component="main"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          p: 0,
          mt: admins.length === 0 ? 0 : 9,
        }}
      >
        {admins.length === 0 ? (
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              m: 0,
              px: 3,
            }}
          >
            <Box
              component="img"
              src="/images/splash_we_admins.png"
              alt={"splash"}
              sx={{
                right: "0",
                mt: "24.89vh",
                width: "min(28.23vh, 53.99vw)",
                height: "min(26.06vh, 49.83vw)",
              }}
            />
            <Typography variant="h2" sx={{ mt: "min(6.63vh, 12.67vw)" }}>
              Add Admins
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              Admins manage the day-to-day of the World Enterprise.
            </Typography>
            <Container
              sx={{
                position: "absolute",
                bottom: "7vh",
                px: 3,
              }}
            >
              <Button fullWidth onClick={addHandler}>
                Add Admins
              </Button>
            </Container>
          </Container>
        ) : (
          <AdminsList />
        )}
      </Grid>
      {admins.length !== 0 && stepState === STEP.CREATE_ADMINS_VIEW && (
        <Box sx={{ mt: 4, mb: 3, px: 3 }}>
          <Button fullWidth onClick={continueHandler}>
            Create World Enterprise
          </Button>
        </Box>
      )}
    </>
  );
};

export default AdminsView;
