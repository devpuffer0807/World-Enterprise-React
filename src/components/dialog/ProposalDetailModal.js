import { Close } from "@mui/icons-material";
import {
  DialogTitle,
  IconButton,
  Divider,
  DialogContent,
  Container,
  DialogActions,
} from "@mui/material";
import React from "react";
import DetailDialog, {
  InfoAddr,
  InfoVote,
  BtnCancel,
  BtnOK,
  Info,
} from "./DetailDialog";
import Transition from "./Transition";

const ProposalDetailModal = ({
  open,
  handleClose,
  reject,
  agree,
  name,
  walletAddr,
  id,
  yesNum,
  noNum,
}) => {
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
        <span>{"Proposal Detail"}</span>
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
        <Info label="Name" value={name} />
        <InfoAddr label="Wallet" value={walletAddr} />
        <Info label="Proposal ID" value={id} />
        <Container
          component="span"
          sx={{
            display: "flex",
            margin: "12px 0px",
            p: 0,
          }}
        >
          <InfoVote type="yes" num={yesNum} />
          <InfoVote type="no" num={noNum} />
        </Container>
        {/* <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText> */}
      </DialogContent>
      <Divider />
      <DialogActions>
        <BtnCancel onClick={() => reject()}>Reject</BtnCancel>
        <BtnOK onClick={() => agree()}>Agree</BtnOK>
      </DialogActions>
    </DetailDialog>
  );
};

export default ProposalDetailModal;
