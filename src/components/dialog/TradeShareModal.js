import React from "react";
import { Close } from "@mui/icons-material";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import DetailDialog, { BtnOK, Info, InfoInput } from "./DetailDialog";
import Transition from "./Transition";

const TradeShareModal = ({ open, type, onClose, order }) => {
  const [amount, setAmount] = useState("0");
  const [price, setPrice] = useState("0");

  const handleInputChange = (typee) => (evt) => {
    let value = evt.currentTarget.value.replace("$", "");
    let regExp = /[0-9]+/;
    switch (typee) {
      case "price":
        regExp = /[0-9]*([.])?[0-9]?[0-9]?/;
        console.log(value);
        if (regExp.exec(value)?.[0] === value || value === "") {
          if (/[0][0-9]+[.]?[0-9]*/.exec(value)?.[0] === value)
            value = value.slice(1, value.length);
          if (/[.][0-9]*/.exec(value)?.[0] === value) value = `0${value}`;
          setPrice(value);
        }
        break;
      case "amount":
        regExp = /[0-9]+/;
        if (regExp.exec(value)?.[0] === value || value === "") {
          console.log(value, value[0] === "0" && value[1] !== ".");
          if (/[0][0-9]+[.]?[0-9]*/.exec(value)?.[0] === value)
            value = value.slice(1, value.length);

          setAmount(value);
        }
        break;
      default:
        break;
    }
  };

  const orderHandler = () => {
    order(Number(amount), Number(price));
  };

  useEffect(() => {
    setPrice("0");
    setAmount("0");
  }, [open, type, order]);

  return (
    <DetailDialog
      open={open}
      onClose={() => onClose()}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="xl"
    >
      <DialogTitle id="alert-dialog-title">
        <span>
          {type === "buy" && "Buy"}
          {type === "sell" && "Sell"}
        </span>
        <IconButton
          size="small"
          sx={{ position: "absolute", right: "12px" }}
          onClick={() => onClose()}
        >
          <Close htmlColor="#99A7C7" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <InfoInput
          label="Amount"
          placeholder="0"
          value={amount === "0" ? "" : amount}
          onChange={handleInputChange("amount")}
          type={"string"}
        />
        <InfoInput
          label="Price"
          placeholder="$0.00"
          value={price === "0" ? "" : `$${price}`}
          onChange={handleInputChange("price")}
          type={"string"}
        />
        <Info
          label="Total"
          value={`$${(Number(amount) * Number(price)).toFixed(2)}`}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <BtnOK onClick={orderHandler}>Submit Request</BtnOK>
      </DialogActions>
    </DetailDialog>
  );
};

export default TradeShareModal;
