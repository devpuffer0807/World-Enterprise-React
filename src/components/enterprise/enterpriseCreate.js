import { CameraAlt, HelpOutlineOutlined, Person } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import { useNavigate } from "react-router-dom";
import { CreateAppBar } from "../Appbar";
import { HtmlTooltip, PhotoEditorModal } from "../dialog";
import { AddressInput, Input, Select } from "../input";

import store from "../../store/store";
import { STORE_KEYS, STEP } from "../../store/constant";

const DetailCreate = () => {
  const navigation = useNavigate();

  const [enterprises, , updateEnterprises] = store.useState(
    STORE_KEYS.id.enterprises
  );
  const [step, setStep] = store.useState(STORE_KEYS.id.step);

  const [enterpriseInfo, setEnterpriseInfo] = useState({
    ...enterprises.enterprises.tempEnterprise.info,
    wepID: Date.now().toString(),
  });
  const [address, setAddress] = useState();
  const [editorOpen, setEditorOpen] = useState(false);
  const [image, setImage] = useState(undefined);
  // const [address2Focus, setAddress2Focus] = useState(false);

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) return;
    console.log(fileObj);
    setEditorOpen(true);
    setImage(fileObj);
    // setEnterpriseInfo((prev: EnterpriseInfo) => {
    //   return {
    //     ...prev,
    //     logo: URL.createObjectURL(fileObj)
    //   }
    // })
    // console.log(URL.createObjectURL(fileObj))
  };

  const editorClose = () => {
    // setImage(undefined)
    setEditorOpen(false);
  };

  const editorOK = (imageURL) => {
    setEnterpriseInfo((prev) => {
      return {
        ...prev,
        logo: imageURL,
      };
    });
  };

  const handleInputChange = (type) => (evt) => {
    const value = evt.currentTarget.value;
    switch (type) {
      case "name":
        setEnterpriseInfo((prev) => {
          return {
            ...prev,
            name: value,
          };
        });
        break;
      case "tokenName":
        setEnterpriseInfo((prev) => {
          return {
            ...prev,
            tokenName: value,
          };
        });
        break;
      case "description":
        setEnterpriseInfo((prev) => {
          return {
            ...prev,
            description: value,
          };
        });
        break;
      case "zip":
        setEnterpriseInfo((prev) => {
          return {
            ...prev,
            zip: value,
          };
        });
        break;
      case "address2":
        setEnterpriseInfo((prev) => {
          return {
            ...prev,
            address2: value,
          };
        });
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (type) => (evt) => {
    const value = evt.target.value;
    switch (type) {
      case "isRegisterd":
        let isRegistered = false;
        if (value === "Yes") isRegistered = true;
        else isRegistered = false;
        setEnterpriseInfo((prev) => {
          return {
            ...prev,
            isRegisterd: isRegistered,
          };
        });
        break;
      case "type":
        setEnterpriseInfo((prev) => {
          return {
            ...prev,
            type: value,
          };
        });
        break;
      case "country":
        setEnterpriseInfo((prev) => {
          return {
            ...prev,
            country: value,
          };
        });
        break;
      case "state":
        setEnterpriseInfo((prev) => {
          return {
            ...prev,
            state: value,
          };
        });
        break;
      case "city":
        setEnterpriseInfo((prev) => {
          return {
            ...prev,
            city: value,
          };
        });
        break;
      default:
        break;
    }
  };

  const handleAddressChange = (type) => (addr) => {
    switch (type) {
      case "address1":
        if (!addr || !addr?.value?.place_id) {
          return setAddress({
            label: "",
            value: {
              description: "",
              matched_substrings: [],
              place_id: "",
              reference: "",
              structured_formatting: {
                main_text: "",
                main_text_matched_substrings: [],
                secondary_text: "",
              },
              terms: [],
              types: [],
            },
          });
        }
        const place_id = addr?.value.place_id || "";
        // const key = process.env.REACT_APP_GOOGLEMAP_APIKEY;
        geocodeByPlaceId(place_id).then((result) => {
          console.log("result", result);
          let address1 = "";
          let postcode = "";
          let city = "";
          let state = "";
          let country = "";
          result[0].address_components.map((component) => {
            const componentType = component.types[0];
            switch (componentType) {
              case "street_number": {
                address1 = `${component.long_name} ${address1}`;
                break;
              }

              case "route": {
                address1 += component.short_name;
                break;
              }

              case "postal_code": {
                postcode = `${component.long_name}${postcode}`;
                break;
              }

              case "postal_code_suffix": {
                postcode = `${postcode}-${component.long_name}`;
                break;
              }

              case "locality":
                city = component.long_name;
                break;

              case "administrative_area_level_1": {
                state = component.short_name;
                break;
              }

              case "country":
                country = component.long_name;
                break;
              default:
                break;
            }
            return true;
          });
          console.log({ address1, postcode, city, state, country });
          setAddress(addr);
          // document.querySelector("#address2")?.setAttribute("autofocus", "");
          // address2Ref.current?.focus();
          // setAddress2Focus(true)
          setAddress((prev) => {
            if (prev)
              return {
                ...prev,
                label: address1,
              };
          });
          setEnterpriseInfo((prev) => {
            return {
              ...prev,
              address1: address1,
              city: city,
              state: state,
              country: country,
              zip: postcode,
            };
          });
        });
        break;
      default:
        break;
    }
  };

  const continueHandler = (info) => () => {
    updateEnterprises((prev) => {
      prev.tempEnterprise.info = info;
      return prev;
    });
    switch (step) {
      case STEP.CREATE_ENTERPRISE_INPUT:
        setStep(STEP.CREATE_SHAREHOLDERS_VIEW);
        break;
      case STEP.SETTING_COMPANY_EDIT:
        setStep(STEP.SETTING_COMPANY_REVIEW);
        break;

      default:
        break;
    }
  };

  const closeHandler = () => {
    switch (step) {
      case STEP.CREATE_ENTERPRISE_INPUT:
        setStep(STEP.CREATE_ENTERPRISE_INPUT);
        navigation("/");
        break;
      case STEP.SETTING_COMPANY_EDIT:
        setStep(STEP.SETTING_COMPANY_REVIEW);
        break;

      default:
        break;
    }
  };

  let address2Ref = useRef(null);

  return (
    <>
      <CreateAppBar
        title="Company Details"
        close={closeHandler}
        helpEnabled={false}
      />
      <Grid
        container
        component="main"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          px: 3,
          mt: 5,
        }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          badgeContent={
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleFileChange}
                value={""}
              />
              <Avatar
                sx={{
                  width: "24px",
                  height: "24px",
                  backgroundColor: "#FF6142",
                }}
              >
                <CameraAlt sx={{ width: "16px", color: "#FFFFFF" }} />
              </Avatar>
            </IconButton>
            // <SmallAvatar alt="Remy Sharp" src="/images/ABC_Logo1.png" />
          }
        >
          <Avatar sx={{ width: "111px", height: "111px" }}>
            {enterpriseInfo.logo !== "" ? (
              <img
                alt="logo"
                src={enterpriseInfo.logo}
                style={{ width: "100%" }}
              />
            ) : (
              <Person
                sx={{ width: "70px", height: "70px" }}
                htmlColor="#4B4749"
              />
            )}
          </Avatar>
        </Badge>
        <Box width="100%" mt={6}>
          <InputLabel shrink htmlFor="name">
            Enterprise Name
          </InputLabel>
          <Input
            id="name"
            value={enterpriseInfo.name}
            fullWidth
            sx={{ mt: 1 }}
            onChange={handleInputChange("name")}
          />
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="tokenName">
            Token Name
            <HtmlTooltip title="Every World Enterprise has its own ERC20 token">
              <IconButton size="small" color="inherit">
                <HelpOutlineOutlined fontSize="small" color="inherit" />
              </IconButton>
            </HtmlTooltip>
          </InputLabel>
          <Input
            id="tokenName"
            value={enterpriseInfo.tokenName}
            fullWidth
            sx={{ mt: 1 }}
            onChange={handleInputChange("tokenName")}
          />
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="description">
            Enterprise Description
          </InputLabel>
          <Input
            id="description"
            value={enterpriseInfo.description}
            fullWidth
            sx={{ mt: 1 }}
            multiline
            rows={4}
            onChange={handleInputChange("description")}
          />
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="isRegisterd">
            Is this an existing company registered with a government?
          </InputLabel>
          <Select
            id="isRegisterd"
            value={enterpriseInfo.isRegisterd ? "Yes" : "No"}
            fullWidth
            sx={{ mt: 1 }}
            itemType="select"
            onChange={handleSelectChange("isRegisterd")}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="type">
            Type of Company
          </InputLabel>
          <Select
            id="type"
            value={enterpriseInfo.type}
            fullWidth
            sx={{ mt: 1 }}
            onChange={handleSelectChange("type")}
          >
            <MenuItem value="LLC">LLC</MenuItem>
            <MenuItem value="c-corp">c-corp</MenuItem>
            <MenuItem value="s-corp">s-corp</MenuItem>
            <MenuItem value="non-profit">non-profit</MenuItem>
            <MenuItem value="other">other</MenuItem>
          </Select>
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="address1">
            Address Line 1 (optional)
          </InputLabel>
          <Box sx={{ p: 0, mt: 1, width: "100%" }}>
            <AddressInput
              address={address}
              onChange={handleAddressChange("address1")}
            />
          </Box>
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="address2">
            Address Line 2 (optional)
          </InputLabel>
          <Input
            id="address2"
            value={enterpriseInfo.address2 || ""}
            inputRef={address2Ref}
            fullWidth
            sx={{ mt: 1 }}
            onChange={handleInputChange("address2")}
          />
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="country">
            Country (optional)
          </InputLabel>
          <Input
            id="country"
            value={enterpriseInfo.country || ""}
            fullWidth
            sx={{ mt: 1 }}
          />
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="zip">
            ZIP (optional)
          </InputLabel>
          <Input
            id="zip"
            value={enterpriseInfo.zip || ""}
            fullWidth
            sx={{ mt: 1 }}
            onChange={handleInputChange("zip")}
          />
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="state">
            State (optional)
          </InputLabel>
          <Input
            id="state"
            value={enterpriseInfo.state || ""}
            fullWidth
            sx={{ mt: 1 }}
          />
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="city">
            City (optional)
          </InputLabel>
          <Input
            id="city"
            value={enterpriseInfo.city || ""}
            fullWidth
            sx={{ mt: 1 }}
          />
        </Box>
        <Button
          fullWidth
          sx={{ mt: 2, mb: 3 }}
          onClick={continueHandler(enterpriseInfo)}
        >
          Continue
        </Button>
      </Grid>
      <PhotoEditorModal
        open={editorOpen}
        onClose={editorClose}
        image={image}
        onOK={editorOK}
      />
    </>
  );
};

export default DetailCreate;
