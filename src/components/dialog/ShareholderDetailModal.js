import React from "react";
import { Close } from "@mui/icons-material";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import DetailDialog, { BtnCancel, Info, InfoAddr } from "./DetailDialog";
import Transition from "./Transition";

const ShareholderDetailModal = ({
  open,
  onClose,
  firstName,
  lastName,
  numOfShares,
  walletAddr,
  replace,
  remove,
}) => {
  console.log(numOfShares);
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
        <span>{"Shareholder"}</span>
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
        <InfoAddr label="Wallet" value={walletAddr} />
        <Info label="Number of Shares" value={(numOfShares + 0).toString()} />
        <Info label="Name" value={`${firstName} ${lastName}`} />
      </DialogContent>
      <Divider />
      <DialogActions>
        <BtnCancel onClick={() => replace()}>Replace</BtnCancel>
        <BtnCancel onClick={() => remove()}>Remove</BtnCancel>
      </DialogActions>
    </DetailDialog>
  );
};

export default ShareholderDetailModal;
