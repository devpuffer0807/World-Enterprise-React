import React from "react";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export { default as AdminDetailModal } from "./AdminDetailModal";
export * from "./Alert";
export { default as Alert } from "./Alert";
export * from "./DetailDialog";
export { default as DetailDialog } from "./DetailDialog";
export { default as JoinModal } from "./JoinModal";
export { default as OrderDetailModal } from "./OrderDetailModeal";
export { default as PhotoEditorModal } from "./PhotoEditorModal";
export { default as ProposalDetailModal } from "./ProposalDetailModal";
export { default as QRScanModal } from "./QRScanModal";
export { default as ShareholderDetailModal } from "./ShareholderDetailModal";
export { default as ShareholderDetailTradeModal } from "./ShareholderDetailTradeModal";
export * from "./Tooltip";
export { default as TransactionDetailModal } from "./TransactionDetailModal";
export { default as Transition } from "./Transition";

export default function AlertDialog({
  opened,
  title,
  ac1,
  ac1Click,
  ac1Color,
  ac2,
  ac2Click,
  ac2Color,
  closeHandler,
}) {
  return (
    <div>
      <Dialog
        open={opened}
        onClose={() => {
          closeHandler();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            // background: "#FFFFFFFF",
            background: "rgba(0, 0, 0, 0)",
            boxShadow: "none",
            position: "absolute",
            bottom: 3,
            m: 0,
            p: 2,
            // mx: 2,
            textAlign: "center",
            width: "calc(100% - 36px)",
          },

          "& .MuiDialogTitle-root": {
            backgroundColor: "#FFFFFF",
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "15px",
            lineHeight: "18px",
            textAlign: "center",
            color: "#000000",

            borderRadius: "16px",
            py: "20px",
            // height: "50px",
          },

          "& .MuiDialogActions-root": {
            flexDirection: "column",
            backgroundColor: "#FFFFFF",

            mt: "12px",
            p: "0px",
            borderRadius: "16px",
            justifyContent: "center",
          },

          "& .MuiDialogActions-root button": {
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "20px",
          },

          "& .MuiDialogActions-root > :not(:first-of-type)": {
            marginLeft: "0px",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              ac1Click();
              closeHandler();
            }}
            fullWidth
            sx={{
              m: 0,
              py: "20px",
              borderRadius: "16px 16px 0px 0px",
              backgroundColor: "#FFFFFFFF",
              boxShadow: "none",
              color: ac1Color,
              ":hover": {
                backgroundColor: "#FFFFFFFF",
                boxShadow: "none",
              },
            }}
          >
            {ac1}
          </Button>
          <Divider sx={{ color: "EEEEEE", width: "100%" }} />
          <Button
            onClick={() => {
              ac2Click();
              closeHandler();
            }}
            fullWidth
            sx={{
              m: 0,
              py: "20px",
              borderRadius: "0px 0px 16px 16px",
              backgroundColor: "#FFFFFFFF",
              boxShadow: "none",
              color: ac2Color,
              ":hover": {
                backgroundColor: "#FFFFFFFF",
                boxShadow: "none",
              },
            }}
          >
            {ac2}
          </Button>
        </DialogActions>
        <DialogActions>
          <Button
            onClick={() => {
              closeHandler();
            }}
            fullWidth
            sx={{
              m: 0,
              py: "20px",
              borderRadius: "16px",
              backgroundColor: "#FFFFFFFF",
              boxShadow: "none",
              color: "#000000",
              ":hover": {
                backgroundColor: "#FFFFFFFF",
                boxShadow: "none",
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
