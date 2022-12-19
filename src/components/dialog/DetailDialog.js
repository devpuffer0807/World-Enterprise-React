/**
 * @author Puffer
 * @createdAt 12/19/2022
 * @updatedAt 12/19/2022
 **/

import {
  ContentCopy,
  Done,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  IconButton,
  Link,
  styled,
} from "@mui/material";
import { useState } from "react";

const DetailDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    background: "#ffffff",
    boxShadow: "none",
    position: "absolute",
    bottom: 0,
    margin: 0,
    padding: "0px 16px 0px 16px",
    textAlign: "center",
    width: "calc(100% - 32px)",
    borderRadius: "16px 16px 0px 0px",
    color: "#241F21",
    // width: "100%",
  },

  "& .MuiDialogTitle-root": {
    padding: "16px 0px",
    backgroundColor: "#FFFFFF",
    borderRadius: "16px 16px 0px 0px",
  },

  "& .MuiDialogTitle-root span": {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "18px",
    textAlign: "center",
    color: "#000000",
  },

  "& .MuiDialogContent-root": {
    backgroundColor: "#FFFFFF",
    padding: "4px 0px",
  },

  "& .MuiDialogContent-root > div": {
    display: "flex",
    justifyContent: "flex-start",
    border: "1px solid #E3E8EB",
    borderRadius: "8px",
    padding: "15px 12px",
    margin: "12px 0px",

    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "15px",
    color: "#000000",
  },

  "& .MuiDialogContent-root > div > span": {
    display: "block",
    width: "100%",
  },

  "& .MuiDialogContent-root > div > input": {
    display: "block",
    width: "fit-content",
    textAlign: "right",
    border: "1px solid #FFFFFFFF",
    ":focusVisible": {
      border: "1px solid #FFFFFFFF",
    },
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "15px",
    color: "#000000",
    outline: "none",
  },

  "& .MuiDialogActions-root": {
    backgroundColor: "#FFFFFF",
    padding: "16px 0px 28px 0px",
  },

  "& .MuiDialogActions-root button": {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "20px",
  },

  // "& .MuiDialogActions-root > :not(:first-of-type)": {
  //   marginLeft: "0px",
  // }
}));

export default DetailDialog;

export const InfoInput = ({
  label,
  type,
  value,
  placeholder,
  onChange,
}: {
  label: string,
  type: "int" | "float" | "string",
  value: string,
  placeholder?: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
}) => {
  return (
    <div>
      <span style={{ textAlign: "left", width: "100%" }}>{label}</span>
      <input
        id="amount"
        value={value}
        onChange={(eve: React.ChangeEvent<HTMLInputElement>) => {
          onChange(eve);
        }}
        placeholder={placeholder}
      />
    </div>
  );
};

export const Info = ({
  label,
  value,
  type,
}: {
  label: string,
  value: string,
  type?: "email" | "phone",
}) => {
  // const openLinkInBrowser = (url: string) => () => {
  //   /* eslint-disable */
  //   if (navigator?.app?.loadUrl) {
  //       navigator.app.loadUrl(url, { openExternal:true });
  //   }
  //   else {
  //       window.open(url, '_system');
  //   }
  // }

  return (
    <div>
      <span style={{ textAlign: "left" }}>{label}</span>
      {(() => {
        switch (type) {
          case "email":
            return (
              <span style={{ textAlign: "right" }}>
                <Link
                  href={`mailto:${value}`}
                  /* target="_blank" */ sx={{
                    color: "#241F21",
                    textDecoration: "none",
                    ":visited": {
                      color: "#241F21",
                    },
                  }}
                >
                  {value}
                </Link>
              </span>
            );
          case "phone":
            return (
              <span style={{ textAlign: "right" }}>
                <Link
                  href={`tel:${value}`}
                  /* target="_blank" */ sx={{
                    color: "#241F21",
                    textDecoration: "none",
                    ":visited": {
                      color: "#241F21",
                    },
                  }}
                >
                  {value}
                </Link>
              </span>
            );
          default:
            return <span style={{ textAlign: "right" }}>{value}</span>;
        }
      })()}
    </div>
  );
};

export const InfoAddr = ({
  label,
  value,
}: {
  label: string,
  value: string,
}) => {
  const [copyed, setCopyed] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopyed(true);
  };

  return (
    <div>
      <span style={{ textAlign: "left" }}>{label}</span>
      <span
        style={{
          textAlign: "right",
          maxWidth: "16ch",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </span>
      <IconButton
        onClick={copyToClipboard}
        sx={{ float: "right", width: "19px", height: "19px" }}
      >
        {!copyed ? (
          <ContentCopy sx={{ width: "19px", height: "19px" }} />
        ) : (
          <Done sx={{ width: "19px", height: "19px" }} htmlColor="green" />
        )}
      </IconButton>
    </div>
  );
};

export const InfoVote = ({ type, num }) => {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row",
        padding: "10px 20px",
        marginRight: type === "yes" ? "7px" : "0px",
        border: "1px solid #E3E8EB",
        borderRadius: "8px",
        width: "100%",
      }}
    >
      <Avatar
        style={{
          width: "42px",
          height: "42px",
          borderWidth: "0px",
          marginRight: "10px",
          backgroundColor: type === "yes" ? "#42B03D1E" : "#FF2A001E",
        }}
      >
        {type === "yes" ? (
          <ThumbUpAltOutlined htmlColor="#42B03D" />
        ) : (
          <ThumbDownAltOutlined htmlColor="#FF2A00" />
        )}
      </Avatar>
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          width: "100%",
          fontFamily: "Montserrat",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "15px",
            paddingTop: "2px",
          }}
        >
          {type === "yes" ? "Yes" : "No"} Vote
        </span>
        <span
          style={{
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "20px",
            paddingTop: "3px",
          }}
        >
          {num}
        </span>
      </div>
    </div>
  );
};

export const BtnCancel = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  height: "53px",
  backgroundColor: "#E3E8EB",
  textAlign: "center",
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "17px",
  lineHeight: "22px",
  color: "#4B4749",
  width: "100%",
  ":hover": {
    backgroundColor: "#f3f6f8",
  },
}));

export const BtnOK = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  height: "53px",
  backgroundColor: "#42B03D",
  textAlign: "center",
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "17px",
  lineHeight: "22px",
  color: "#ffffff",
  width: "100%",
  ":hover": {
    backgroundColor: "#4bcb46",
  },
}));

export const BtnOption = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  height: "48px",
  margin: "5px 0px",
  padding: "15px",
  backgroundColor: "#FFFFFF",
  textAlign: "left",
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "22px",
  color: "#367BCF",
  width: "100%",
  boxShadow: "none",
  border: "1px solid #E3E8EB",
  display: "flex",
  justifyContent: "flex-start",
  ":hover": {
    backgroundColor: "#EEEEEE",
    boxShadow: "none",
  },
  "& span": {
    width: "100%",
  },
}));
