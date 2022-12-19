import React, { useEffect, useState } from "react";
import { QrCode } from "@mui/icons-material";
import { Button, Grid, IconButton, InputLabel } from "@mui/material";
import { AppBar } from "../Appbar";
import { QRScanModal } from "../dialog";
import { Input } from "../input";

import store from "../../store/store";
import { STORE_KEYS, STEP } from "../../store/constant";

const ShareholderAdd = () => {
  const [stepState, setStep] = store.useState(STORE_KEYS.id.step);

  const [enterprises, , updateEnterprises] = store.useState(
    STORE_KEYS.id.enterprises
  );
  const shareholdersState = enterprises.enterprises.tempEnterprise.shareholders;
  const toEditState = enterprises.enterprises.toEditShareholder;

  const [shareholder, setShareholder] = useState({
    walletAddr: "",
    numOfShare: 0,
    firstName: "",
    lastName: "",
  });

  // QR code
  const [qrScanOpen, setQrScanOpen] = useState(false);

  const handleClickShowQR = () => {
    setQrScanOpen(true);
  };

  const closeQRScaner = () => {
    setQrScanOpen(false);
  };

  const qrHandler = (addr) => {
    setShareholder((prev) => {
      return {
        ...prev,
        walletAddr: addr,
      };
    });
  };

  const handleInputChange = (type) => (evt) => {
    const value = evt.currentTarget.value;
    switch (type) {
      case "walletAddr":
        setShareholder((prev) => {
          return {
            ...prev,
            walletAddr: value,
          };
        });
        break;
      case "numOfShare":
        const temp = Number(value.replace(".", ""));
        console.log(value, temp);
        if (!isNaN(temp) && value.length <= 19 && temp >= 0) {
          setShareholder((prev) => {
            return {
              ...prev,
              numOfShare: Number(temp),
            };
          });
        }
        break;
      case "firstName":
        setShareholder((prev) => {
          return {
            ...prev,
            firstName: value,
          };
        });
        break;
      case "lastName":
        setShareholder((prev) => {
          return {
            ...prev,
            lastName: value,
          };
        });
        break;
      default:
        break;
    }
  };

  const continueHandler = (info) => () => {
    switch (stepState) {
      case STEP.CREATE_SHAREHOLDER_ADD:
        updateEnterprises((prev) => {
          prev.tempEnterprise.shareholders = [
            ...prev.tempEnterprise.shareholders,
            info,
          ];
          return prev;
        });
        setStep(STEP.CREATE_SHAREHOLDERS_VIEW);
        break;
      case STEP.CREATE_SHAREHOLDER_EDIT:
        updateEnterprises((prev) => {
          prev.tempEnterprise.shareholders[prev.toEditShareholder] = info;
          return prev;
        });
        setStep(STEP.CREATE_SHAREHOLDERS_VIEW);
        break;
      case STEP.PROPOSAL_SHAREHOLDER:
        const proposal = {
          id: Date.now(),
          type: "shareholder",
          votesYes: 0,
          votesNo: 0,
          walletAddr: info.walletAddr,
          name: `${info.firstName} ${info.lastName}`,
          isApproved: false,
        };
        updateEnterprises((prev) => {
          prev.tempEnterprise.proposals = [
            ...prev.tempEnterprise.proposals,
            proposal,
          ];
          return prev;
        });
        setStep(STEP.INDEX);
        break;
      case STEP.DASHBOARD_MEMBERS_SHAREHOLDER_EDIT:
        updateEnterprises((prev) => {
          prev.tempEnterprise.shareholders[prev.toEditShareholder] = info;
          return prev;
        });
        setStep(STEP.DASHBOARD_MEMBERS);
        break;
      default:
        break;
    }
  };

  const backHandler = () => {
    switch (stepState) {
      case STEP.CREATE_SHAREHOLDER_ADD:
      case STEP.CREATE_SHAREHOLDER_EDIT:
        setStep(STEP.CREATE_SHAREHOLDERS_VIEW);
        break;
      case STEP.PROPOSAL_SHAREHOLDER:
        setStep(STEP.INDEX);
        break;
      case STEP.DASHBOARD_MEMBERS_SHAREHOLDER_EDIT:
        setStep(STEP.DASHBOARD_MEMBERS);
        break;
      default:
        break;
    }
    if (
      stepState === STEP.CREATE_SHAREHOLDER_ADD ||
      stepState === STEP.CREATE_SHAREHOLDER_EDIT
    ) {
      setStep(STEP.CREATE_SHAREHOLDERS_VIEW);
    }
  };

  useEffect(() => {
    console.log(toEditState);
    if (
      stepState === STEP.CREATE_SHAREHOLDER_EDIT ||
      stepState === STEP.DASHBOARD_MEMBERS_SHAREHOLDER_EDIT
    ) {
      const original = shareholdersState.at(toEditState);
      if (original) {
        setShareholder(original);
      }
    }
  }, [setShareholder, shareholdersState, stepState, toEditState]);

  return (
    <>
      <AppBar
        position="sticky"
        title={(() => {
          switch (stepState) {
            case STEP.CREATE_SHAREHOLDER_ADD:
              return "Add Shareholder";
            case STEP.PROPOSAL_SHAREHOLDER:
              return "Propose Shareholder";
            case STEP.CREATE_SHAREHOLDER_EDIT:
            case STEP.DASHBOARD_MEMBERS_SHAREHOLDER_EDIT:
              return "Replace Shareholder";
            default:
              return "Shareholder";
          }
        })()}
        back={backHandler}
        handle={() => {}}
        type="help"
      />
      <Grid
        container
        component="main"
        spacing={2}
        direction="row"
        sx={{
          px: 3,
          mt: 5,
        }}
      >
        <Grid item xs={12}>
          <InputLabel shrink htmlFor="walletAddr">
            Wallet Address
          </InputLabel>
          <Input
            id="walletAddr"
            value={shareholder.walletAddr}
            fullWidth
            sx={{ mt: 1 }}
            onChange={handleInputChange("walletAddr")}
            endAdornment={
              <IconButton onClick={handleClickShowQR} edge="end">
                <QrCode />
              </IconButton>
            }
          />
        </Grid>
        <Grid item xs={12} mt={4}>
          <InputLabel shrink htmlFor="numOfShare">
            Number of Shares
          </InputLabel>
          <Input
            id="numOfShare"
            value={
              shareholder.numOfShare === 0
                ? ""
                : shareholder.numOfShare.toString()
            }
            fullWidth
            sx={{
              mt: 1,
              "& input": {
                textAlign: "right",
              },
            }}
            onChange={handleInputChange("numOfShare")}
            placeholder="0"
          />
        </Grid>
        <Grid item xs={6} mt={7}>
          <InputLabel shrink htmlFor="firstName">
            First Name (optional)
          </InputLabel>
          <Input
            id="firstName"
            value={shareholder.firstName}
            fullWidth
            sx={{ mt: 1 }}
            onChange={handleInputChange("firstName")}
          />
        </Grid>
        <Grid item xs={6} mt={7}>
          <InputLabel shrink htmlFor="lastName">
            Last Name (optional)
          </InputLabel>
          <Input
            id="lastName"
            value={shareholder.lastName}
            fullWidth
            sx={{ mt: 1 }}
            onChange={handleInputChange("lastName")}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            sx={{ mt: 7, mb: 3 }}
            onClick={continueHandler(shareholder)}
          >
            {(() => {
              switch (stepState) {
                case STEP.CREATE_SHAREHOLDER_ADD:
                  return "Add Shareholder";
                case STEP.PROPOSAL_SHAREHOLDER:
                  return "Propose Shareholder";
                case STEP.CREATE_SHAREHOLDER_EDIT:
                case STEP.DASHBOARD_MEMBERS_SHAREHOLDER_EDIT:
                  return "Replace Shareholder";
                default:
                  return "Shareholder";
              }
            })()}
          </Button>
        </Grid>
      </Grid>
      <QRScanModal
        open={qrScanOpen}
        onClose={closeQRScaner}
        qrHandler={qrHandler}
      />
    </>
  );
};

export default ShareholderAdd;
