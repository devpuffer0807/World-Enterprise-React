import React, { useEffect, useState } from "react";
import { Divider, List, ListItemButton, ListItemText } from "@mui/material";
import { ShareholderDetailModal, ShareholderDetailTradeModal } from "../dialog";

import store from "../../store/store";
import { STORE_KEYS, STEP } from "../../store/constant";

const ShareholdersList = () => {
  const [enterprises, , updateEnterprises] = store.useState(
    STORE_KEYS.id.enterprises
  );
  const [stepState, setStep] = store.useState(STORE_KEYS.id.step);

  const shareholdersState = enterprises.enterprises.tempEnterprise.shareholders;

  const [totalNum, setTotalNum] = useState(0);
  const [totalPercent, setTotalPercent] = useState(0);
  const [shareholders, setShareholders] = useState([]);

  const [idx, setIdx] = useState(-1);
  const [dlgOpened, setDlgOpened] = useState(false);

  const replaceHandler = (idx) => () => {
    updateEnterprises((prev) => {
      prev.toEditShareholder = idx;
      return prev;
    });

    switch (stepState) {
      case STEP.CREATE_SHAREHOLDERS_VIEW:
        setStep(STEP.CREATE_SHAREHOLDER_EDIT);
        break;

      case STEP.DASHBOARD_MEMBERS:
        // const updatedOne
        // dispatch(replaceShareholderState())
        // dispatch(setStepState(STEP.DASHBOARD_MEMBERS_SHAREHOLDER_EDIT))
        break;

      default:
        break;
    }
  };

  const updateHandler = (idx) => (updated) => {
    updateEnterprises((prev) => {
      prev.toEditShareholder = idx;
      prev.tempEnterprise.shareholders[prev.toEditShareholder] = updated;
      return prev;
    });
  };

  const removeHandler = (idx) => () => {
    updateEnterprises((prev) => {
      prev.tempEnterprise.shareholders.splice(idx, 1);
      return prev;
    });
  };

  useEffect(() => {
    let total = 0;
    shareholdersState.forEach((s) => {
      total += s.numOfShare;
    });
    setTotalNum(total);
    setTotalPercent(100);
    setShareholders([]);
    shareholdersState.map((s) => {
      return setShareholders((prev) => {
        return [
          ...prev,
          {
            name: s.firstName + " " + s.lastName,
            walletAddr: s.walletAddr,
            numOfShare: s.numOfShare,
            percent: total > 0 ? (s.numOfShare / total) * 100 : 0,
          },
        ];
      });
    });
  }, [shareholdersState]);

  return (
    <>
      <List dense={true} sx={{ width: "100%", pt: 2, px: 0 }}>
        <Item
          name="Total Shares"
          walletAddr="Total Ownership"
          numOfShare={totalNum}
          percent={totalPercent}
          numColor="#3D61B0"
          percentColor="#42B03D"
        />
        {shareholders.map((s, idx) => {
          return (
            <Item
              key={idx}
              name={s.name}
              walletAddr={s.walletAddr}
              numOfShare={s.numOfShare}
              percent={s.percent}
              numColor="#241F21"
              percentColor="#4B4749"
              onClick={() => {
                setIdx(idx);
                setDlgOpened(true);
              }}
            />
          );
        })}
      </List>
      {stepState === STEP.CREATE_SHAREHOLDERS_VIEW && (
        <ShareholderDetailModal
          open={dlgOpened}
          onClose={() => {
            setDlgOpened(false);
          }}
          firstName={
            (shareholdersState[idx] && shareholdersState[idx].firstName) || ""
          }
          lastName={
            (shareholdersState[idx] && shareholdersState[idx].lastName) || ""
          }
          numOfShares={
            shareholdersState[idx] &&
            (shareholdersState[idx].numOfShare === undefined
              ? 0
              : shareholdersState[idx].numOfShare)
          }
          walletAddr={
            (shareholdersState[idx] && shareholdersState[idx].walletAddr) || ""
          }
          replace={replaceHandler(idx)}
          remove={removeHandler(idx)}
        />
      )}
      {stepState === STEP.DASHBOARD_MEMBERS && (
        <ShareholderDetailTradeModal
          open={dlgOpened}
          onClose={() => {
            setDlgOpened(false);
          }}
          firstName={
            (shareholdersState[idx] && shareholdersState[idx].firstName) || ""
          }
          lastName={
            (shareholdersState[idx] && shareholdersState[idx].lastName) || ""
          }
          numOfShares={
            shareholdersState[idx] &&
            (shareholdersState[idx].numOfShare === undefined
              ? 0
              : shareholdersState[idx].numOfShare)
          }
          walletAddr={
            (shareholdersState[idx] && shareholdersState[idx].walletAddr) || ""
          }
          update={updateHandler(idx)}
          // remove={removeHandler((idx))}
        />
      )}
    </>
  );
};

export const Item = ({
  name,
  walletAddr,
  numOfShare,
  percent,
  numColor,
  percentColor,
  onClick,
}) => {
  return (
    <>
      <ListItemButton
        component="div"
        sx={{
          px: 3,
          py: 1,
        }}
        onClick={() => {
          if (onClick) {
            onClick();
          }
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
          primary={numOfShare}
          secondary={percent.toFixed(2) + "%"}
          primaryTypographyProps={{
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "15px",
            lineHeight: "18px",
            textAlign: "right",
            color: numColor,
          }}
          secondaryTypographyProps={{
            mt: 1,
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "15px",
            textAlign: "right",
            color: percentColor,
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

export default ShareholdersList;
