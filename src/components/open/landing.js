/**
 * @author Puffer
 * @createdAt 12/19/2022
 * @updatedAt 12/19/2022
 **/

import detectEthereumProvider from "@metamask/detect-provider";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { connectors } from "../../utils/connectors";
import { mobileCheck } from "../../utils/mobileCheck";
import SelectWalletModal from "../dialog/SelectWalletModal";

const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { activate } = useWeb3React();
  const [provider, setProvider] = React.useState(null);

  const connectHandler = () => {
    if (mobileCheck() && provider) {
      const connector = connectors.injected;
      activate(connector);
    } else {
      setIsOpen(true);
    }
  };

  const Close = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    detectEthereumProvider().then((provider: any) => {
      console.log("Provider detection finished", provider);
      setProvider(provider);
    });
  }, []);

  return (
    <Grid
      container
      px={4}
      sx={{
        backgroundColor: "#FFDB0A",
        width: "100vw",
        height: "100vh",
      }}
      alignItems="center"
      justifyContent="center"
      component="main"
    >
      <Box
        component="img"
        src="/images/Splash_Element1.png"
        alt={"SP1"}
        style={{
          position: "absolute",
          left: "0",
          top: "3.53vh",
          width: "9.65vh",
          height: "30vh",
        }}
      />
      <Box
        component="img"
        src="/images/Splash_Element2.png"
        alt={"SP2"}
        style={{
          position: "absolute",
          left: "0",
          top: "27.72vh",
          width: "4.42vh",
          height: "8.83vh",
        }}
      />
      <Box
        component="img"
        src="/images/Splash_Element3.png"
        alt={"SP3"}
        style={{
          position: "absolute",
          right: "0",
          top: "0",
          width: "13.4vw",
          height: "9.6vw",
        }}
      />
      <Box
        component="img"
        src="/images/Splash_Element4.png"
        alt={"SP4"}
        style={{
          position: "absolute",
          right: "0",
          bottom: "15.83vh",
          width: "8.83vh",
          height: "8.83vh",
        }}
      />
      <Box
        component="img"
        src="/images/Splash_Element5.png"
        alt={"SP5"}
        style={{
          position: "absolute",
          right: "0",
          bottom: "7vh",
          width: "8.83vh",
          height: "8.83vh",
        }}
      />
      <Box
        component="img"
        src="/images/WC.png"
        alt={"WC"}
        style={{
          marginBottom: "-50vh",
          width: "50vw",
          height: "20.8vw",
        }}
      />
      <Button
        sx={{
          borderRadius: "75px",
          marginTop: "-15vh",
          backgroundColor: "#1098FC",
          ":hover": {
            backgroundColor: "#0B74BF",
          },
        }}
        fullWidth
        onClick={connectHandler}
      >
        Connect to MetaMask
      </Button>
      <SelectWalletModal isOpen={isOpen} closeModal={Close} />
    </Grid>
  );
};

export default Landing;
