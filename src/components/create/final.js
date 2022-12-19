import { Person, Star } from "@mui/icons-material";
import { Avatar, Button, Container, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import store from "../../store/store";
import { STORE_KEYS } from "../../store/constant";

const Final = () => {
  const navigation = useNavigate();
  const [enterprises, , updateEnterprises] = store.useState(
    STORE_KEYS.id.enterprises
  );

  const [logoUrl, setLogoUrl] = useState("");
  const [name, setName] = useState("");
  const [id, setID] = useState("");

  const continueHandler = () => {
    const enterprise = {
      info: enterprises.enterprises.tempEnterprise.info,
      shareholders: enterprises.enterprises.tempEnterprise.shareholders,
      admins: enterprises.enterprises.tempEnterprise.admins,
      proposals: [],
      transactions: [],
      orders: [],
      mine: true,
    };
    updateEnterprises((prev) => {
      prev.enterprises = [...prev.enterprises, enterprise];
      return prev;
    });
    navigation("/");
  };

  useEffect(() => {
    setLogoUrl(enterprises.enterprises.tempEnterprise.info.logo);
    setName(enterprises.enterprises.tempEnterprise.info.name);
    setID("0xfsjshd1452");
  }, [setID, setLogoUrl, setName, enterprises]);

  return (
    <Container
      sx={{
        height: "100vh",
        padding: "0",
      }}
    >
      <Star
        style={{
          position: "absolute",
          color: "#FFDB0A",
          fontSize: "10px",
          left: "27.5%",
          top: "27.2%",
        }}
      />
      <Star
        style={{
          position: "absolute",
          color: "#00C9F2",
          fontSize: "16px",
          transform: "rotate(45deg)",
          opacity: "0.22",
          left: "18.6%",
          top: "34%",
        }}
      />
      <Star
        style={{
          position: "absolute",
          color: "#FF6142",
          fontSize: "16px",
          transform: "rotate(45deg)",
          opacity: "0.39",
          right: "26.6%",
          top: "27.9%",
        }}
      />
      <Star
        style={{
          position: "absolute",
          color: "#00C9F2",
          fontSize: "8px",
          transform: "rotate(5deg)",
          right: "32.7%",
          top: "37.4%",
        }}
      />
      <Star
        style={{
          position: "absolute",
          color: "#FFDB0A",
          fontSize: "21px",
          transform: "rotate(45deg)",
          opacity: "0.19",
          right: "15.7%",
          top: "39.4%",
        }}
      />
      <Grid
        container
        direction="row"
        component="main"
        spacing={2}
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Grid item container alignContent="center" justifyContent="center">
          <Avatar sx={{ width: "105px", height: "105px" }}>
            {logoUrl !== "" ? (
              <Box component="img" src={logoUrl} width="100%" />
            ) : (
              <Person
                sx={{ width: "70px", height: "70px" }}
                htmlColor="#4B4749"
              />
            )}
          </Avatar>
        </Grid>
        <Grid item container alignContent="center" justifyContent="center">
          <Typography variant="h4">Congratulations!</Typography>
        </Grid>
        <Grid item container alignContent="center" justifyContent="center">
          <Typography
            variant="body2"
            sx={{ width: "100%", textAlign: "center" }}
          >
            World Enterprise created for
          </Typography>
          <Typography
            variant="body2"
            sx={{ width: "100%", textAlign: "center" }}
          >
            {name}.
          </Typography>
          <Typography
            variant="body2"
            sx={{ width: "100%", textAlign: "center" }}
          >
            The WEp id is {id}.
          </Typography>
        </Grid>
      </Grid>
      <Container
        sx={{
          position: "absolute",
          bottom: "7vh",
          px: 3,
        }}
      >
        <Button fullWidth onClick={continueHandler}>
          Go To World Enterprise
        </Button>
      </Container>
      {/* <Grid sx={{
        position: "absolute",
        bottom: "0",
        width: "100%",
        px: 3,
        mb: 3,
      }}>
        <Button
          fullWidth
          onClick={continueHandler}
          sx={{
            position: "relative"
          }}
        >
          Go To World Enterprise
        </Button>
      </Grid> */}
    </Container>
  );
};

export default Final;
