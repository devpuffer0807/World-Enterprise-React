import { Close } from "@mui/icons-material";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DetailDialog, { BtnCancel, Info, InfoInput } from "./DetailDialog";
import Transition from "./Transition";

const JoinModal = ({
  open,
  onClose,
  name,
  shareToBuy,
  offerPrice,
  request,
}) => {
  const [isRequest, setIsRequest] = useState(true);
  const [toBuy, setToBuy] = useState(0);
  const [price, setPrice] = useState(
    offerPrice === 0 ? "" : offerPrice.toString()
  );
  const handleInputChange = (type) => (eve) => {
    let value = eve.currentTarget.value.replace("$", "");
    const temp = Number(value);
    const regExp = /[0-9]*([.])?[0-9]?[0-9]?/;
    if (regExp.exec(value)?.[0] === value || value === "") {
      console.log(value);
      if (/[0][0-9]+[.]?[0-9]*/.exec(value)?.[0] === value)
        value = value.slice(1, value.length);
      if (/[.][0-9]*/.exec(value)?.[0] === value) value = `0${value}`;
      switch (type) {
        case "toBuy":
          if (!isNaN(Number(temp))) {
            setToBuy(temp);
          }
          break;
        case "price":
          setPrice(value);
          break;
        default:
          break;
      }
    }
  };
  const switchHandler = (flag) => () => {
    setIsRequest(flag);
  };

  useEffect(() => {
    setPrice(offerPrice === 0 ? "" : offerPrice.toString());
  }, [open, offerPrice]);
  return (
    <DetailDialog
      open={open}
      onClose={() => onClose()}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xl"
    >
      <DialogTitle id="alert-dialog-title">
        <span>{"Join World Enterprise"}</span>
        <IconButton
          size="small"
          sx={{ position: "absolute", right: "12px" }}
          onClick={() => onClose()}
        >
          <Close htmlColor="#99A7C7" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid
          component="h2"
          container
          onClick={switchHandler(!isRequest)}
          sx={{
            width: "100%",
            lineHeight: "40px",
            py: 0,
            my: 0,
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "15px",
            textAlign: "center",
            borderRadius: "8px",
            border: "1px solid #E3E8EB",
            cursor: "pointer",
          }}
        >
          <Grid
            item
            xs={6}
            component="div"
            style={{
              display: "inline-block",
              borderRadius: "8px",
              backgroundColor: isRequest ? "#3D61B0" : "#ffffff",
              color: isRequest ? "#ffffff" : "#96A3AA",
            }}
          >
            Buy Shares
          </Grid>
          <Grid
            item
            xs={6}
            component="div"
            style={{
              display: "inline-block",
              borderRadius: "8px",
              backgroundColor: isRequest ? "#ffffff" : "#3D61B0",
              color: isRequest ? "#96A3AA" : "#ffffff",
            }}
          >
            Request to Buy Shares
          </Grid>
        </Grid>
        <Divider sx={{ mt: 1.5 }} />
        <Info label="Enterprise Name" value={name} />
        <InfoInput
          label={isRequest ? "Shares To Buy" : "Amount of Shares"}
          type="string"
          placeholder="0"
          value={toBuy === 0 ? "" : toBuy.toString()}
          onChange={handleInputChange("toBuy")}
        />
        {isRequest && (
          <>
            <InfoInput
              label="Offer Price($)"
              placeholder="0.00"
              value={price === "" ? "" : `${price}`}
              type="string"
              onChange={handleInputChange("price")}
            />
            <Info
              label="Total"
              value={`$${(toBuy * Number(price)).toFixed(2)}`}
            />
          </>
        )}
      </DialogContent>
      <Divider />
      <DialogActions>
        <BtnCancel onClick={() => request()}>Send Request</BtnCancel>
      </DialogActions>
    </DetailDialog>
  );
};

export default JoinModal;
