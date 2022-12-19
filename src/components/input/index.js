import React from "react";
import {
  alpha,
  Box,
  Chip as MuiChip,
  InputBase,
  Select as MuiSelect,
  styled,
} from "@mui/material";
import GooglePlaceAutocomplete from "./GooglePlacesAutocomplete";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const Input = styled(InputBase)(({ theme }) => ({
  "&$disabled": {
    color: "red",
  },
  "& .MuiInputBase-input": {
    position: "relative",
    border: "1px solid #ffffffff",
    borderRadius: "8px",
    backgroundColor: theme.palette.mode === "light" ? "#FAFBFC" : "#FAFBFC",

    color: "#4B4749",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: 500,
    fontFamily: ['"Montserrat"'].join(","),
    lineHeight: "18px",

    padding: "12px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      border: "1px solid #ced4da",
    },
  },
  "& .MuiInputBase-input.Mui-disabled": {
    // "-webkit-text-fill-color": "#4B4749",
    WebkitTextFillColor: "#4B4749",
    backgroundColor: "#D8D8D8",
  },
}));

export const Select = styled(MuiSelect)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: "#FAFBFC",
  color: "#4B4749",
  fontSize: "15px",
  fontWeight: 500,
  fontStyle: "normal",
  fontFamily: "Montserrat",
  borderColor: "#FFFFFFFF",

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#FFFFFFFF !important",
  },
  "& .MuiOutlinedInput-input": {
    padding: "12px",
    borderRadius: "8px",
  },
  "& Mui-disabled ~ .MuiOutlinedInput-notchedOutline": {
    borderColor: "#FFFFFFFF",
  },
  "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled":
    {
      // "-webkit-text-fill-color": "#4B4749",
      WebkitTextFillColor: "#4B4749",
      backgroundColor: "#D8D8D8",
      borderColor: "#FFFFFFFF",
      borderRadius: "8px",
    },
  // '&$focused .MuiOutlinedInput-notchedOutline': {
  //   boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
  //   border: '1px solid #ced4da',
  // }
}));

// address

// const newAddress = (address) => {
//   const addr = {
//     label: address,
//     value: {
//       description: address,
//       matched_substrings: [],
//       place_id: "",
//       reference: "",
//       structured_formatting: {
//         main_text: "",
//         main_text_matched_substrings: [],
//         secondary_text: "",
//       },
//       terms: [],
//       types: [],
//     },
//   };
//   return addr;
// };

export const AddressInput = ({ address, onChange }) => {
  // const [addressVal, setAddressVal] = useState(newAddress(address))
  return (
    <GooglePlaceAutocomplete
      apiKey={process.env.NEXT_PUBLIC_GOOGLEMAP_APIKEY}
      autocompletionRequest={{
        componentRestrictions: {
          country: ["us", "ca"],
        },
      }}
      selectProps={{
        value: address,
        onChange: (addr: GoogleAddress) => {
          console.log(addr);
          onChange(addr);
        },
      }}
    />
  );
};

// phone input
// const phoneInputStyles = (theme) => ({
//   field: {
//     margin: "10px 0",
//   },
//   countryList: {
//     ...theme.typography.body1,
//   },
// });

export const PhoneNumInput = (props) => {
  const { value, onChange } = props;

  return (
    <Box
      sx={{
        border: "1px solid #ffffffff",
        borderRadius: "8px",
        ":hover": {
          border: "1px solid #ced4da",
        },
      }}
    >
      <PhoneInput
        country="us"
        value={value}
        onChange={(phone) => onChange(phone)}
        containerStyle={{
          width: "100%",
          height: "48px",
          borderRadius: "8px",
        }}
        inputStyle={{
          width: "100%",
          height: "48px",
          borderRadius: "8px",
          paddingTop: "12px",
          paddingBottom: "12px",
          borderWidth: "0",
          backgroundColor: "#FAFBFC",
          color: "#4B4749",
          fontSize: "15px",
          fontStyle: "normal",
          fontWeight: 500,
          fontFamily: ['"Montserrat"'].join(","),
        }}
        buttonStyle={{
          borderRadius: "8px",
          paddingTop: "12px",
          paddingBottom: "12px",
          borderWidth: "0",
        }}
      />
    </Box>
  );
};

export const Chip = styled(MuiChip)(({ theme }) => ({
  backgroundColor: "#FAFBFC",
  color: "#241F21",
  fontFamily: "Montserrat",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "17px",
  letterSpacing: "0px",
  textAlign: "center",
  borderRadius: "8px",

  ":hover": {
    background: "#00C9F2",
    color: "#fff",
  },
}));
