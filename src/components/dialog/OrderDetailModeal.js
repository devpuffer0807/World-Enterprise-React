import { Close } from "@mui/icons-material";
import {
  DialogTitle,
  IconButton,
  Divider,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DetailDialog, { InfoAddr, BtnCancel, Info, BtnOK } from "./DetailDialog";
import Transition from "./Transition";

const OrderDetailModal = ({ open, onClose, order, accept }) => {
  const [orderDetail, setOrder] = useState({
    id: -1,
    orderType: "buy",
    amount: 0,
    price: 0,
    date: new Date(),
    maker: "",
    taker: "",
  });

  useEffect(() => {
    console.log("order");
    console.log(order);
    if (order !== undefined) setOrder(order);
  }, [order]);

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
        <span>{"Order Detail"}</span>
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
        <InfoAddr label="Maker" value={orderDetail.maker} />
        <Info label="Shares" value={`${orderDetail.amount}`} />
        <Info label="Price" value={`$${orderDetail.price}`} />
        <Info
          label="Total"
          value={`$${orderDetail.price * orderDetail.amount}`}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <BtnCancel onClick={() => onClose()}>Cancel</BtnCancel>
        <BtnOK onClick={() => accept()}>Accept</BtnOK>
      </DialogActions>
    </DetailDialog>
  );
};

export default OrderDetailModal;
