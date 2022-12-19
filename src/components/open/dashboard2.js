import React, { useState } from "react";
import { Add, ArrowForwardIos, Person, Search } from "@mui/icons-material";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useNavigate } from "react-router-dom";
import { HomeAppBar } from "../Appbar";
import { JoinModal } from "../dialog";

import store from "../../store/store";
import { STORE_KEYS } from "../../store/constant";

const DashBoard2 = () => {
  const { account } = useWeb3React();
  const [enterprises, setEnterprises] = store.useState(
    STORE_KEYS.id.enterprises
  );
  const navigate = useNavigate();

  const [isMine, setIsMine] = useState(true);
  const [idx, setIdx] = useState(-1);
  const [dlgOpened, setDlgOpened] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  const newHandler = () => {
    navigate("/create");
  };

  const searchHandler = (evt) => {
    if (evt.key === "Enter") {
      // Prevent's default 'Enter' behavior.
      evt.preventDefault();
      // your handler code
    }
  };

  const onClickItem = (idx) => () => {
    console.log(idx);
    console.log(enterprises);
    if (enterprises[idx]) {
      if (!enterprises[idx].mine) {
        setIdx(idx);
        setDlgOpened(true);
      } else {
        requestHandler(idx)();
      }
    }
  };

  const requestHandler = (idx) => () => {
    const enterprise = enterprises[idx];
    console.log(enterprise);
    const joinProposal = {
      id: Date.now(),
      type: "join",
      votesYes: 0,
      votesNo: 0,
      walletAddr: account || "",
      name: "",
      isApproved: false,
    };
    setEnterprises((prev) => {
      prev.tempEnterprise.info = enterprise.info;
      prev.tempEnterprise.admins = enterprise.admins;
      prev.tempEnterprise = enterprise;
      prev.tempEnterprise.proposals = [
        ...prev.tempEnterprise.proposals,
        joinProposal,
      ];
      return prev;
    });
    navigate(`/${enterprise.info.wepID}/dashboard`);
  };

  const switchHandler = (isMine) => {
    setIsMine(isMine);
  };

  const handleSearchInput = (evt) => {
    const value = evt.currentTarget.value;
    setSearchWord(value);
  };

  return (
    <>
      <HomeAppBar />
      <Container
        sx={{ display: "flex", px: 2, py: 0, width: "100%" }}
        maxWidth={false}
      >
        <Grid
          component="h2"
          container
          onClick={switchHandler(!isMine)}
          sx={{
            width: "100%",
            lineHeight: "40px",
            py: 0,
            my: 0,
            mr: 2,
            ml: 0,
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "15px",
            textAlign: "center",
            borderRadius: "8px",
            border: "1px solid #E3E8EB",
            cursor: "pointer",
          }}
        >
          <Grid
            item
            xs={6}
            component="div"
            style={{
              display: "inline-block",
              borderRadius: "8px",
              backgroundColor: isMine ? "#3D61B0" : "#ffffff",
              color: isMine ? "#ffffff" : "#96A3AA",
            }}
          >
            My Enterprises
          </Grid>
          <Grid
            item
            xs={6}
            component="div"
            style={{
              display: "inline-block",
              borderRadius: "8px",
              backgroundColor: isMine ? "#ffffff" : "#3D61B0",
              color: isMine ? "#96A3AA" : "#ffffff",
            }}
          >
            All Enterprises
          </Grid>
        </Grid>
        <Button
          sx={{
            // marginLeft: "-51px",
            // paddingLeft: "-51px",
            p: 0,
            border: "1px solid #3D61B0",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            boxShadow: "0",

            minWidth: "42px",
            // "& .MuiTouchRipple-root": {
            //   width: "40px!important",
            //   background: "#ff0000",
            // },
            ":hover": {
              backgroundColor: "#ffffff",
            },
          }}
          onClick={newHandler}
        >
          <Add
            fontSize="large"
            htmlColor="#3D61B0"
            sx={{
              p: 0,
            }}
          />
        </Button>
        {/* <IconButton>
        </IconButton> */}
      </Container>
      <Container sx={{ mt: 2, px: 2, width: "100%" }} maxWidth={false}>
        {/* <Paper
          component="div"
          sx={{ display: 'flex', alignItems: 'center', width: "100%" }}
        > */}
        <Autocomplete
          fullWidth
          freeSolo
          id="search"
          disableClearable
          options={enterprises
            .filter((enterprise) => !isMine || (isMine && enterprise.mine))
            .map((enterprise) => enterprise.info.name)}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                type: "search",
                startAdornment: (
                  <InputAdornment position="start">
                    <Search htmlColor="#96A3AA" />
                  </InputAdornment>
                ),
              }}
              value={searchWord}
              onChange={handleSearchInput}
              placeholder="Search Enterprise"
              sx={{
                height: "42px",
                backgroundColor: "#FFFFFFFF",
                border: "1px solid #E3E8EB",
                borderRadius: "8px",

                "& .MuiInputBase-root:hover": {
                  // borderColor: "#FF0000",
                  // WebkitTapHighlightColor: "#FF0000!important",
                  // backgroundColor: "#FF0000",
                },

                // backgroundColor: "#FF0000",
                // borderColor: "#00FFFF",
                "& input": {
                  // height: "42px",
                  // backgroundColor: "#FFFFFFFF",
                  boxShadow: "none",
                  color: "#4B4749",
                  fontSize: "15px!important",
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  lineHeight: "18.29px",
                  padding: "0!important",
                },
                "& fieldset": {
                  height: "42px",

                  border: "1px solid #FFFFFFFF",
                  "& fieldset:focus": {
                    border: "1px solid #ced4da !important",
                  },
                  "&:focus": {
                    // boxShadow: `0 0 0 0.2rem`,
                  },
                },
              }}
            />
          )}
          renderOption={(props, option, { inputValue }) => {
            console.log(props, option, { inputValue });
            const matches = match(option, inputValue, { insideWords: true });
            const parts = parse(option, matches);

            return (
              <>
                <Divider />
                <li {...props} style={{ paddingLeft: "9px" }}>
                  <Search fontSize="small" htmlColor="#96A3AA" sx={{ mr: 1 }} />
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
          onKeyDown={searchHandler}
          onSubmit={() => {}}
        />
        {/* </Paper> */}
      </Container>
      <Grid
        container
        component="main"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          p: 0,
          // mt: 4,
        }}
      >
        <List dense={true} sx={{ width: "100%", pt: 2, px: 0 }}>
          <Divider />
          {enterprises.map((enterprise, idx) => {
            console.log(
              enterprise.info.name
                .toLowerCase()
                .indexOf(searchWord.toLowerCase())
            );
            if (
              (!isMine || (isMine && enterprise.mine)) &&
              enterprise.info.name
                .toLowerCase()
                .indexOf(searchWord.toLowerCase()) > -1
            ) {
              return (
                <Item
                  key={idx}
                  avatar={enterprise.info.logo}
                  title={enterprise.info.name}
                  content={enterprise.info.tokenName}
                  onClick={onClickItem(idx)}
                />
              );
            }
            return null;
          })}
        </List>
      </Grid>
      {enterprises[idx] && (
        <JoinModal
          open={dlgOpened}
          onClose={() => {
            setDlgOpened(false);
          }}
          name={enterprises[idx].info.name}
          shareToBuy={150}
          offerPrice={0}
          request={requestHandler(idx)}
        />
      )}
    </>
  );
};

export const Item = ({
  avatar,
  title,
  content,
  onClick,
}: {
  avatar: string,
  title: string,
  content: string,
  onClick: Function,
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
          onClick();
        }}
      >
        <ListItemAvatar sx={{ pr: 2 }}>
          <Avatar sx={{ width: "63px", height: "63px" }}>
            {avatar === "" ? (
              <Person fontSize="large" htmlColor="#4B4749" />
            ) : (
              <img alt="" src={avatar} style={{ width: "100%" }} />
            )}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={content}
          primaryTypographyProps={{
            fontFamily: "Montserrat",
            fontSize: "15px",
            fontWeight: "600",
            lineHeight: "18px",
            letterSpacing: "0px",
            textAlign: "left",
          }}
          secondaryTypographyProps={{
            mt: 1,
            fontFamily: "Montserrat",
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "15px",
            letterSpacing: "0px",
            textAlign: "left",
          }}
          sx={{
            display: "block",
            width: "100%",
          }}
        />
        <IconButton edge="end" aria-label="delete">
          <ArrowForwardIos fontSize="small" />
        </IconButton>
      </ListItemButton>
      <Divider />
    </>
  );
};

export default DashBoard2;
