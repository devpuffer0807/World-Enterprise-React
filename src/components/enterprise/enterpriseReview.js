import React from "react";
import { HelpOutlineOutlined, Person } from "@mui/icons-material";
import { Avatar, Box, Grid, IconButton, Link, Typography } from "@mui/material";
import { CreateAppBar } from "../Appbar";

import store from "../../store/store";
import { STORE_KEYS, STEP } from "../../store/constant";

const DetailCreate = () => {
  const [enterprises] = store.useState(STORE_KEYS.id.enterprises);
  const enterpriseInfo = enterprises.enterprises.tempEnterprise.info;

  const [step, setStep] = store.useState(STORE_KEYS.id.step);

  const closeHandler = () => {
    switch (step) {
      case STEP.SETTING_COMPANY_REVIEW:
        setStep(STEP.INDEX);
        break;

      default:
        break;
    }
  };

  const editHandler = () => {
    switch (step) {
      case STEP.SETTING_COMPANY_REVIEW:
        setStep(STEP.SETTING_COMPANY_EDIT);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <CreateAppBar
        title="Review Company Details"
        close={closeHandler}
        helpEnabled={false}
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
          my: 5,
        }}
      >
        <Avatar sx={{ width: "111px", height: "111px" }}>
          {enterpriseInfo.logo !== "" ? (
            <img
              alt="logo"
              src={enterpriseInfo.logo}
              style={{ width: "100%" }}
            />
          ) : (
            <Person
              sx={{ width: "70px", height: "70px" }}
              htmlColor="#4B4749"
            />
          )}
        </Avatar>
        <Link
          sx={{
            alignSelf: "end",
            width: "auto",
            color: "#3D61B0",
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "15px",
            lineHeight: "18px",
            textAlign: "right",
            cursor: "pointer",
            right: "0",
          }}
          mt={3}
          onClick={editHandler}
        >
          Edit
        </Link>
        <Box width="100%" mt={3}>
          <Typography variant="body2">Enterprise Name</Typography>
          <Typography
            variant="h3"
            mt={2}
            sx={{ fontWeight: 500, minHeight: "20px" }}
          >
            {enterpriseInfo.name}
          </Typography>
        </Box>
        <Box width="100%" mt={3}>
          <Typography variant="body2">
            Token Name
            <IconButton size="small" color="inherit">
              <HelpOutlineOutlined fontSize="small" color="inherit" />
            </IconButton>
          </Typography>
          <Typography
            variant="h3"
            mt={2}
            sx={{ fontWeight: 500, minHeight: "20px" }}
          >
            {enterpriseInfo.tokenName}
          </Typography>
        </Box>
        <Box width="100%" mt={3}>
          <Typography variant="body2">Enterprise Description</Typography>
          <Typography
            variant="h3"
            mt={2}
            sx={{ fontWeight: 500, minHeight: "20px" }}
          >
            {enterpriseInfo.description}
          </Typography>
          {/* <Input id="description" value={enterpriseInfo.description} fullWidth sx={{ mt: 1 }} multiline rows={4} disabled/> */}
        </Box>
        <Box width="100%" mt={3}>
          <Typography variant="body2">
            Is this an existing company registered with a government?
          </Typography>
          <Typography
            variant="h3"
            mt={2}
            sx={{ fontWeight: 500, minHeight: "20px" }}
          >
            {enterpriseInfo.isRegisterd ? "Yes" : "No"}
          </Typography>
        </Box>
        <Box width="100%" mt={3}>
          <Typography variant="body2">Address Line 1</Typography>
          <Typography
            variant="h3"
            mt={2}
            sx={{ fontWeight: 500, minHeight: "20px" }}
          >
            {enterpriseInfo.address1}
          </Typography>
        </Box>
        <Box width="100%" mt={3}>
          <Typography variant="body2">Address Line 2</Typography>
          <Typography
            variant="h3"
            mt={2}
            sx={{ fontWeight: 500, minHeight: "20px" }}
          >
            {enterpriseInfo.address2}
          </Typography>
        </Box>
        <Box width="100%" mt={3}>
          <Typography variant="body2">Country</Typography>
          <Typography
            variant="h3"
            mt={2}
            sx={{ fontWeight: 500, minHeight: "20px" }}
          >
            {enterpriseInfo.country}
          </Typography>
        </Box>
        <Box width="100%" mt={3}>
          <Typography variant="body2">ZIP</Typography>
          <Typography
            variant="h3"
            mt={2}
            sx={{ fontWeight: 500, minHeight: "20px" }}
          >
            {enterpriseInfo.zip}
          </Typography>
        </Box>
        <Box width="100%" mt={3}>
          <Typography variant="body2">State</Typography>
          <Typography
            variant="h3"
            mt={2}
            sx={{ fontWeight: 500, minHeight: "20px" }}
          >
            {enterpriseInfo.state}
          </Typography>
        </Box>
        <Box width="100%" mt={3}>
          <Typography variant="body2">City</Typography>
          <Typography
            variant="h3"
            mt={2}
            sx={{ fontWeight: 500, minHeight: "20px" }}
          >
            {enterpriseInfo.city}
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default DetailCreate;
