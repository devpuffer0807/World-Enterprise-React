import React from "react";
import { Close } from "@mui/icons-material";
import { DialogContent, DialogTitle, Divider, IconButton } from "@mui/material";
import DetailDialog, { Info } from "./DetailDialog";
import Transition from "./Transition";
import store from "../../store/store";
import { STORE_KEYS } from "../../store/constant";

const ProposalDetailModal = ({ open, handleClose, reject, agree, value }) => {
  const [enterprises] = store.useState(STORE_KEYS.id.enterprises);
  const enterprise = enterprises.tempEnterprise;

  return (
    <DetailDialog
      open={open}
      onClose={() => handleClose()}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xl"
    >
      <DialogTitle id="alert-dialog-title">
        <span>{"Transaction Detail"}</span>
        <IconButton
          size="small"
          sx={{ position: "absolute", right: "12px" }}
          onClick={() => handleClose()}
        >
          <Close htmlColor="#99A7C7" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Info label="Type" value={value?.type || ""} />
        <Info
          label="Asset"
          value={`${
            value?.asset === "TOKEN" ? enterprise.info.tokenName : value?.asset
          } (${value?.isSend ? "send" : "receive"})`}
        />
        <Info label="Category" value={`${value?.category}`} />
        <Info label="Amount" value={value?.amount.toString() || ""} />
        <Info label="Note" value={value?.note || ""} />
        <Info
          label="Date"
          value={
            value?.date.toLocaleString("en-us", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }) || ""
          }
        />
      </DialogContent>
      {/* <Divider/> */}
      {/* <DialogActions>
        <BtnCancel onClick={()=>reject()}>Reject</BtnCancel>
        <BtnOK onClick={()=>agree()}>
          Agree
        </BtnOK>
      </DialogActions> */}
    </DetailDialog>
  );
};

export default ProposalDetailModal;
