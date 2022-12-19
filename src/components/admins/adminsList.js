import React, { useState } from "react";
import { Divider, List, ListItemButton, ListItemText } from "@mui/material";
import { AdminDetailModal } from "../dialog";
import store from "../../store/store";
import { STORE_KEYS, STEP } from "../../store/constant";

const AdminsList = () => {
  const [enterprises, , updateEnterprises] = store.useState(
    STORE_KEYS.id.enterprises
  );
  const admins = enterprises.enterprises.tempEnterprise.admins;

  const [stepState, setStep] = store.useState(STORE_KEYS.id.step);

  const [idx, setIdx] = useState(-1);

  const [dlgOpened, setDlgOpened] = useState(false);

  const replaceHandler = (idx) => () => {
    updateEnterprises((prev) => {
      prev.toEditAdmin = idx;
      return prev;
    });
    switch (stepState) {
      case STEP.CREATE_ADMINS_VIEW:
        setStep(STEP.CREATE_ADMIN_EDIT);
        break;

      case STEP.DASHBOARD_MEMBERS:
        setStep(STEP.DASHBOARD_MEMBERS_ADMIN_EDIT);
        break;

      default:
        setStep(STEP.ADMIN_EDIT);
        break;
    }
    setDlgOpened(false);
  };

  const removeHandler = (idx) => () => {
    switch (stepState) {
      case STEP.CREATE_ADMINS_VIEW:
        updateEnterprises((prev) => {
          prev.tempEnterprise.admins.splice(idx, 1);
          return prev;
        });
        break;

      default:
        updateEnterprises((prev) => {
          prev.tempEnterprise.admins.splice(idx, 1);
          return prev;
        });
        break;
    }
    setDlgOpened(false);
  };

  return (
    <>
      <List dense={true} sx={{ width: "100%", pt: 2, px: 0 }}>
        {admins.map((s, idx) => {
          return (
            <Item
              key={idx}
              name={s.fullName || ""}
              walletAddr={s.walletAddr}
              isActive={s.isActive}
              onClick={() => {
                setIdx(idx);
                setDlgOpened(true);
              }}
            />
          );
        })}
      </List>
      <AdminDetailModal
        open={dlgOpened}
        onClose={() => {
          setDlgOpened(false);
        }}
        email={(admins[idx] && admins[idx].email) || ""}
        phone={(admins[idx] && admins[idx].phone) || ""}
        walletAddr={(admins[idx] && admins[idx].walletAddr) || ""}
        replace={replaceHandler(idx)}
        remove={removeHandler(idx)}
      />
    </>
  );
};

export const Item = ({ name, walletAddr, isActive, onClick }) => {
  return (
    <>
      <ListItemButton
        component="div"
        sx={{
          px: 3,
          py: 1,
        }}
        onClick={() => {
          onClick();
        }}
      >
        <ListItemText
          primary={name}
          secondary={walletAddr}
          primaryTypographyProps={{
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "15px",
            lineHeight: "18px",
            color: "#241F21",
            textAlign: "left",
          }}
          secondaryTypographyProps={{
            mt: 1,
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "15px",
            color: "#4B4749",
            textAlign: "left",
            maxWidth: "24ch",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          sx={{
            display: "block",

            width: "100%",
          }}
        />
        <ListItemText
          primary={isActive ? "Active" : "Pending"}
          secondary={""}
          primaryTypographyProps={{
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "15px",
            lineHeight: "18px",
            textAlign: "right",
            color: "#4B4749",
          }}
          secondaryTypographyProps={{
            mt: 1,
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "15px",
            textAlign: "right",
            color: "#4B4749",
          }}
          sx={{
            display: "block",
            width: "100%",
          }}
        />
      </ListItemButton>
      <Divider />
    </>
  );
};

export default AdminsList;
