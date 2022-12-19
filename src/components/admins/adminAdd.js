import React, { useEffect, useState } from "react";
import { QrCode } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  TextField,
} from "@mui/material";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { AppBar } from "../Appbar";
import { QRScanModal } from "../dialog";
import { Input, PhoneNumInput } from "../input";

import store from "../../store/store";
import { STORE_KEYS, STEP } from "../../store/constant";

const AdminAdd = () => {
  const [enterprises, , updateEnterprises] = store.useState(
    STORE_KEYS.id.enterprises
  );
  const [step, setStep] = store.useState(STORE_KEYS.id.step);

  const adminsState = enterprises.enterprises.tempEnterprise.admins;
  const shareholdersState = enterprises.enterprises.tempEnterprise.shareholders;
  const toEditState = enterprises.enterprises.toEditAdmin;

  const [admin, setAdmin] = useState({
    walletAddr: "",
    isActive: true,
    fullName: "",
    email: "",
    phone: "",
  });
  const [qrScanOpen, setQrScanOpen] = useState(false);
  const handleInputChange = (type) => (evt) => {
    const value = evt.currentTarget.value;
    switch (type) {
      case "walletAddr":
        setAdmin((prev) => {
          return {
            ...prev,
            walletAddr: value,
          };
        });
        break;
      case "fullName":
        setAdmin((prev) => {
          return {
            ...prev,
            fullName: value,
          };
        });
        break;
      case "email":
        setAdmin((prev) => {
          return {
            ...prev,
            email: value,
          };
        });
        break;
      default:
        break;
    }
  };

  const handlePhoneNumInput = (value) => {
    setAdmin((prev) => {
      return {
        ...prev,
        phone: value,
      };
    });
  };

  const continueHandler = (info) => () => {
    const proposal = {
      id: Date.now(),
      type: "admin",
      votesYes: 0,
      votesNo: 0,
      walletAddr: info.walletAddr,
      name: info.fullName || "",
      isApproved: false,
    };
    switch (step) {
      case STEP.CREATE_ADMIN_ADD:
        updateEnterprises((prev) => {
          prev.tempEnterprise.admins = [
            ...prev.tempEnterprise.admins,
            {
              ...info,
              isActive: true,
            },
          ];
          return prev;
        });
        setStep(STEP.CREATE_ADMINS_VIEW);
        break;
      case STEP.CREATE_ADMIN_EDIT:
        updateEnterprises((prev) => {
          prev.tempEnterprise.admins[prev.toEditAdmin] = {
            ...info,
            isActive: true,
          };
          return prev;
        });
        setStep(STEP.CREATE_ADMINS_VIEW);
        break;
      case STEP.ADMIN_ADD:
      case STEP.PROPOSAL_ADMIN:
        updateEnterprises((prev) => {
          prev.tempEnterprise.admins = [
            ...prev.tempEnterprise.admins,
            {
              ...info,
              isActive: false,
            },
          ];
          prev.tempEnterprise.proposals = [
            ...prev.tempEnterprise.proposals,
            {
              ...proposal,
              type: "admin",
            },
          ];

          return prev;
        });
        setStep(STEP.INDEX);
        break;
      case STEP.ADMIN_EDIT:
      case STEP.DASHBOARD_ADMIN_EDIT:
        updateEnterprises((prev) => {
          prev.tempEnterprise.admins[prev.toEditAdmin] = {
            ...info,
            isActive: false,
          };
          prev.tempEnterprise.proposals = [
            ...prev.tempEnterprise.proposals,
            {
              ...proposal,
              type: "adminReplace",
            },
          ];
          return prev;
        });
        setStep(STEP.INDEX);
        break;
      case STEP.DASHBOARD_MEMBERS_ADMIN_EDIT:
        updateEnterprises((prev) => {
          prev.tempEnterprise.admins[prev.toEditAdmin] = {
            ...info,
            isActive: false,
          };
          prev.tempEnterprise.proposals = [
            ...prev.tempEnterprise.proposals,
            {
              ...proposal,
              type: "adminReplace",
            },
          ];
          return prev;
        });
        setStep(STEP.DASHBOARD_MEMBERS);
        break;
      default:
        break;
    }
  };

  const backHandler = () => {
    switch (step) {
      case STEP.CREATE_ADMIN_ADD:
      case STEP.CREATE_ADMIN_EDIT:
        setStep(STEP.CREATE_ADMINS_VIEW);
        break;
      case STEP.ADMIN_ADD:
      case STEP.ADMIN_EDIT:
      case STEP.PROPOSAL_ADMIN:
      case STEP.DASHBOARD_ADMIN_EDIT:
        setStep(STEP.INDEX);
        break;
      case STEP.DASHBOARD_MEMBERS_ADMIN_EDIT:
        setStep(STEP.DASHBOARD_MEMBERS);
        break;
      default:
        break;
    }
  };

  const handleClickShowQR = () => {
    setQrScanOpen(true);
  };

  const closeQRScaner = () => {
    setQrScanOpen(false);
  };

  const qrHandler = (addr: string) => {
    setAdmin((prev) => {
      return {
        ...prev,
        walletAddr: addr,
      };
    });
  };

  // const handleSearchShareholder = () => {};

  useEffect(() => {
    switch (step) {
      case STEP.CREATE_ADMIN_EDIT:
      case STEP.ADMIN_EDIT:
      case STEP.DASHBOARD_ADMIN_EDIT:
      case STEP.DASHBOARD_MEMBERS_ADMIN_EDIT:
        const original = adminsState.at(toEditState);
        if (original) {
          setAdmin(original);
        }
        break;
      default:
        break;
    }
  }, [adminsState, setAdmin, step, toEditState]);

  return (
    <>
      <AppBar
        position="sticky"
        title={(() => {
          switch (step) {
            case STEP.CREATE_ADMIN_ADD:
            case STEP.ADMIN_ADD:
            case STEP.PROPOSAL_ADMIN:
              return "Add Admin";
            case STEP.CREATE_ADMIN_EDIT:
            case STEP.ADMIN_EDIT:
            case STEP.DASHBOARD_ADMIN_EDIT:
            case STEP.DASHBOARD_MEMBERS_ADMIN_EDIT:
              return "Replace Admin";
            default:
              return "";
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
            {/* <Button variant="outlined" size="small" startIcon={<Search sx={{ marginRight: "-5px" }} />} sx={{
              color: "#3D61B0",
              float: "right",
              fontFamily: "Montserrat",
              fontSize: "14px",
              p: 0,
              backgroundColor: "#ffffff",
              ":hover": {
                backgroundColor: "#ffffff"
              }
            }} onClick={handleSearchShareholder}
            >
              Shareholders
            </Button> */}
          </InputLabel>
          <Autocomplete
            fullWidth
            freeSolo
            id="walletAddr"
            disableClearable
            options={shareholdersState.map((shareholder) => shareholder)}
            sx={{
              "& .MuiOutlinedInput-root": {
                p: "0px 12px",
                borderRadius: "8px",
              },
              "& .MuiOutlinedInput-root: hover": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #ced4da",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #ffffffff",
              },
              backgroundColor: "#FAFBFC",
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                  endAdornment: (
                    <IconButton onClick={handleClickShowQR} edge="end">
                      <QrCode />
                    </IconButton>
                  ),
                }}
                value={admin.walletAddr}
                onChange={handleInputChange("walletAddr")}
                sx={{
                  mt: 1,
                  "& .MuiInputBase-input": {
                    position: "relative",
                    border: "1px solid #ffffffff",

                    color: "#4B4749",
                    fontSize: "15px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontFamily: ['"Montserrat"'].join(","),
                    lineHeight: "18px",

                    padding: "12px 0px!important",
                    "&:focus": {
                      border: "1px solid #ffffffff",
                    },
                  },
                }}
              />
            )}
            getOptionLabel={(option) => {
              if (typeof option == "string") return option;
              else return option.walletAddr;
            }}
            renderOption={(props, option, { inputValue }) => {
              // console.log(option)
              const matches = match(option.walletAddr, inputValue, {
                insideWords: true,
              });
              const parts = parse(option.walletAddr, matches);

              const onClickHandler = () => {
                setAdmin((prev) => {
                  console.log(option);
                  return {
                    ...prev,
                    walletAddr: option.walletAddr,
                    fullName: `${option.firstName} ${option.lastName}`,
                  };
                });
              };

              return (
                <>
                  <Divider />
                  <li
                    {...props}
                    style={{ paddingLeft: "9px" }}
                    onTouchStart={onClickHandler}
                  >
                    {/* <Search fontSize="small" htmlColor="#96A3AA" sx={{ mr: 1 }} /> */}
                    <div>
                      {parts.map((part, index) => (
                        <span
                          key={index}
                          style={{
                            fontWeight: part.highlight ? 700 : 400,
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </div>
                  </li>
                </>
              );
            }}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <InputLabel shrink htmlFor="fullName">
            Full Name (optional)
          </InputLabel>
          <Input
            id="fullName"
            value={admin.fullName}
            fullWidth
            sx={{ mt: 1 }}
            onChange={handleInputChange("fullName")}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <InputLabel shrink htmlFor="email">
            Email (optional)
          </InputLabel>
          <Input
            id="email"
            value={admin.email}
            fullWidth
            sx={{ mt: 1 }}
            onChange={handleInputChange("email")}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <InputLabel shrink htmlFor="phone">
            Phone (optional)
          </InputLabel>
          <Box sx={{ p: 0, mt: 1 }}>
            <PhoneNumInput value={admin.phone} onChange={handlePhoneNumInput} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            sx={{ mt: 2, mb: 3 }}
            onClick={continueHandler(admin)}
          >
            {(step === STEP.CREATE_ADMIN_ADD ||
              step === STEP.ADMIN_ADD ||
              step === STEP.PROPOSAL_ADMIN) &&
              "Add Admin"}
            {(step === STEP.CREATE_ADMIN_EDIT ||
              step === STEP.ADMIN_EDIT ||
              step === STEP.DASHBOARD_ADMIN_EDIT ||
              step === STEP.DASHBOARD_MEMBERS_ADMIN_EDIT) &&
              "Replace Admin"}
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

export default AdminAdd;
