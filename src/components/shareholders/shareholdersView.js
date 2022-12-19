import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../Appbar";
import ShareholdersList from "./shareholdersList";

import store from "../../store/store";
import { STORE_KEYS, STEP } from "../../store/constant";

const ShareholdersView = () => {
  const navigation = useNavigate();
  const [enterprises, ,] = store.useState(STORE_KEYS.id.enterprises);
  const shareholdersState = enterprises.enterprises.tempEnterprise.shareholders;

  const [stepState, setStep] = store.useState(STORE_KEYS.id.step);

  const backHandler = () => {
    if (stepState === STEP.CREATE_SHAREHOLDERS_VIEW) {
      setStep(STEP.CREATE_ENTERPRISE_INPUT);
    } else {
      navigation(-1);
    }
  };

  const addHandler = () => {
    if (stepState === STEP.CREATE_SHAREHOLDERS_VIEW) {
      setStep(STEP.CREATE_SHAREHOLDER_ADD);
    } else {
      setStep(STEP.SHAREHOLDER_ADD);
    }
  };

  const continueHandler = () => {
    setStep(STEP.CREATE_ADMINS_VIEW);
  };

  return (
    <>
      <AppBar
        position="absolute"
        title="Shareholders"
        back={backHandler}
        type={shareholdersState.length === 0 ? "none" : "add"}
        handle={shareholdersState.length === 0 ? undefined : addHandler}
      />
      <Grid
        container
        component="main"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          px: 3,
          mt: shareholdersState.length === 0 ? 0 : 9,
        }}
      >
        {shareholdersState.length === 0 ? (
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              m: 0,
              p: 0,
            }}
          >
            <Box
              component="img"
              src="/images/splash_we_members.png"
              alt={"splash"}
              sx={{
                right: "0",
                mt: "24.89vh",
                width: "min(28.23vh, 53.99vw)",
                height: "min(26.06vh, 49.83vw)",
              }}
            />
            <Typography variant="h2" sx={{ mt: "min(6.63vh, 12.67vw)" }}>
              Add Shareholders
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              Shareholders own equity and vote on proposals for the World
              Enterprise.
            </Typography>
            <Container
              sx={{
                position: "absolute",
                bottom: "7vh",
                px: 3,
              }}
            >
              <Button
                fullWidth
                sx={
                  {
                    // mt: "min(19.19vh, 36.7vw)",
                    // mx: 3,
                  }
                }
                onClick={addHandler}
              >
                Add Shareholders
              </Button>
            </Container>
          </Container>
        ) : (
          <>
            <ShareholdersList />
            {stepState === STEP.CREATE_SHAREHOLDERS_VIEW && (
              <Button fullWidth sx={{ mt: 4, mb: 3 }} onClick={continueHandler}>
                Continue to Add Admins
              </Button>
            )}
          </>
        )}
      </Grid>
    </>
  );
};

export default ShareholdersView;
