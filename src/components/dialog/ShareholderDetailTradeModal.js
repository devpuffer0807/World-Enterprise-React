import React from "react";
import { Close } from "@mui/icons-material";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import DetailDialog, { BtnCancel, Info, InfoAddr } from "./DetailDialog";
import TradeShareModal from "./TradeShareModal";
import Transition from "./Transition";
import store from "../../store/store";
import { STORE_KEYS } from "../../store/constant";

const ShareholderDetailTradeModal = ({
  open,
  onClose,
  firstName,
  lastName,
  numOfShares,
  walletAddr,
  update,
}) => {
  const { account } = useWeb3React();
  const [, setEnterprises] = store.useState(STORE_KEYS.id.enterprises);

  const [tradeOpen, setTradeOpen] = useState(false);
  const [tradeType, setTradeType] = useState("buy");

  const tradeClose = () => {
    setTradeOpen(false);
  };

  const order = (amount, price) => {
    console.log(amount, price, account);
    setTradeOpen(false);
    const updated = {
      firstName: firstName,
      lastName: lastName,
      walletAddr: walletAddr,
      numOfShare: numOfShares - amount,
    };
    const orderTx = {
      id: Date.now(),
      orderType: tradeType,
      amount: amount,
      price: price,
      date: new Date(),
      maker: account || "",
      taker: walletAddr,
    };
    setEnterprises((prev) => {
      prev.tempEnterprise.orders = [...prev.tempEnterprise.orders, orderTx];
      return prev;
    });
    update(updated);
  };

  const openTradeDlg = (type) => () => {
    setTradeType(type);
    setTradeOpen(true);
  };

  return (
    <>
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
          <BtnCancel onClick={openTradeDlg("sell")}>Sell Shares</BtnCancel>
          <BtnCancel onClick={openTradeDlg("buy")}>Buy Shares</BtnCancel>
        </DialogActions>
      </DetailDialog>
      <TradeShareModal
        open={tradeOpen}
        type={tradeType}
        onClose={tradeClose}
        order={order}
      />
    </>
  );
};

export default ShareholderDetailTradeModal;
