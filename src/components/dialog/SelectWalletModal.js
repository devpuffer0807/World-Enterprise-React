import * as React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar, DialogContent, Divider } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import detectEthereumProvider from "@metamask/detect-provider";
import { connectors } from "../../utils/connectors";
import DetailDialog, { BtnCancel, BtnOption } from "./DetailDialog";
import { ArrowForward } from "@mui/icons-material";
import Transition from "./Transition";

export default function SelectWalletModal({ isOpen, closeModal }) {
  const { activate } = useWeb3React();
  const [provider, setProvider] = React.useState(null);

  React.useEffect(() => {
    detectEthereumProvider().then((provider) => {
      console.log("Provider detection finished", provider);
      setProvider(provider);
    });
  }, []);

  const walletConnectHandler = React.useCallback(
    (type) => {
      //: "coinbase" | "metamask"
      // capture type parameter in anchor event handler
      return (e) => {
        if (!provider) {
          console.error("Please install metamask or coinbase");
          closeModal();
          return true; // follow the link
        }

        const connector =
          type === "coinbase" ? connectors.coinbaseWallet : connectors.injected;
        activate(connector).then(() => closeModal());

        e.preventDefault();
        return false;
      };
    },
    [provider, activate, closeModal]
  );

  return (
    <div>
      <DetailDialog
        open={isOpen}
        onClose={() => {
          closeModal();
        }}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title">
          <span>{"Select Wallet"}</span>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <BtnOption>
            <Avatar
              variant="square"
              src="/images/coinbase.png"
              sx={{ width: 25, height: 25, mr: 1 }}
            />
            <a
              href={`https://go.cb-w.com/dapp?cb_url=${process.env.NEXT_PUBLIC_APP_SCHEME}%3A%2F%2F${process.env.NEXT_PUBLIC_APP_DOMAIN}%2F`}
              onClick={walletConnectHandler("coinbase")}
            >
              Coinbase Wallet
            </a>
            <ArrowForward htmlColor="#BCC0C4" />
          </BtnOption>
          <BtnOption>
            <Avatar
              variant="square"
              src="/images/metamask.png"
              sx={{ width: 25, height: 25, mr: 1 }}
            />
            <a
              href={`https://metamask.app.link/dapp/${process.env.NEXT_PUBLIC_APP_DOMAIN}/`}
              onClick={walletConnectHandler("metamask")}
            >
              Metamask Wallet
            </a>
            <ArrowForward htmlColor="#BCC0C4" />
          </BtnOption>
        </DialogContent>
        <Divider />
        <DialogActions>
          <BtnCancel
            onClick={() => {
              closeModal();
            }}
          >
            Close
          </BtnCancel>
        </DialogActions>
      </DetailDialog>
    </div>
  );
}
