import React, { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { Container } from "@mui/system";
import { PropagateLoader } from "react-spinners";
import store from "../../store/store";
import { STEP, STORE_KEYS } from "../../store/constant";

const Confirm = () => {
  const [, setStep] = store.useState(STORE_KEYS.id.step);
  useEffect(() => {
    setTimeout(() => {
      setStep(STEP.CREATE_SUCCESSED);
    }, 5000);
  }, [setStep]);

  return (
    <Container
      sx={{
        height: "100vh",
        padding: "20px",
      }}
    >
      <Box
        component="main"
        sx={{
          width: "100%",
          position: "fixed",
          direction: "row",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Container
          sx={{
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src="/images/Briefcase.png"
            sx={{
              display: "block",
              width: "68px",
              margin: "auto",
            }}
          />
        </Container>
        <Container
          sx={{
            mt: 1,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <PropagateLoader
            color="#FFDB0A"
            loading
            style={{
              display: "block",
              height: "10px",
              width: "14px",
              margin: "auto",
              paddingLeft: "-20px",
            }}
          />
        </Container>
        <Container
          sx={{
            mt: 1,
            alignContent: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            creating the world enterprise on the blockchain
          </Typography>
        </Container>
      </Box>
    </Container>
  );
};

export default Confirm;
