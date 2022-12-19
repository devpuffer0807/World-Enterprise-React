import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Box, TextField, ListItemButton, ListItemText } from "@mui/material";
import { useDebouncedCallback } from "use-debounce";
import autocompletionRequestBuilder from "./autocompletionRequestBuilder";
import { Loader } from "@googlemaps/js-api-loader";

const google = window.google;

const GooglePlacesAutocomplete = (
  {
    apiKey = "",
    apiOptions = {},
    autocompletionRequest = {},
    debounce = 300,
    minLengthAutocomplete = 0,
    selectProps = {},
    onLoadFailed = console.error,
    withSessionToken = false,
  },
  ref
) => {
  const [address, setAddress] = React.useState(
    selectProps?.value?.label ? selectProps?.value?.label : ""
  );
  const [suggestionList, setSuggestionList] = React.useState([]);
  const [showList, setShowList] = React.useState(false);

  const [placesService, setPlacesService] = useState(undefined);
  const [sessionToken, setSessionToken] = useState(undefined);
  const [fetchSuggestions] = useDebouncedCallback((value, cb) => {
    if (!placesService) return cb([]);
    if (value.length < minLengthAutocomplete) return cb([]);

    const autocompletionReq = {
      ...autocompletionRequest,
    };

    placesService.getPlacePredictions(
      autocompletionRequestBuilder(
        autocompletionReq,
        value,
        withSessionToken && sessionToken
      ),
      (suggestions) => {
        cb(
          (suggestions || []).map((suggestion) => ({
            label: suggestion.description,
            value: suggestion,
          }))
        );
      }
    );
  }, debounce);

  const initializeService = () => {
    if (!window.google)
      throw new Error(
        "[react-google-places-autocomplete]: Google script not loaded"
      );
    if (!window.google.maps)
      throw new Error(
        "[react-google-places-autocomplete]: Google maps script not loaded"
      );
    if (!window.google.maps.places)
      throw new Error(
        "[react-google-places-autocomplete]: Google maps places script not loaded"
      );

    setPlacesService(new window.google.maps.places.AutocompleteService());
    setSessionToken(new google.maps.places.AutocompleteSessionToken());
  };

  useImperativeHandle(
    ref,
    () => ({
      getSessionToken: () => {
        return sessionToken;
      },
      refreshSessionToken: () => {
        setSessionToken(new google.maps.places.AutocompleteSessionToken());
      },
    }),
    [sessionToken]
  );

  useEffect(() => {
    const init = async () => {
      try {
        if (
          !window.google ||
          !window.google.maps ||
          !window.google.maps.places
        ) {
          await new Loader({
            apiKey,
            ...{ libraries: ["places"], ...apiOptions },
          }).load();
        }
        initializeService();
      } catch (error) {
        onLoadFailed(error);
      }
    };

    if (apiKey) init();
    else initializeService();
  }, [apiKey, apiOptions, onLoadFailed]);

  return (
    <Box width="100%" position={"relative"}>
      <TextField
        label=""
        variant="outlined"
        value={address}
        fullWidth
        onChange={(e) => {
          setAddress(e.target.value);
          if (e.target.value === "") {
            setShowList(false);
            setSuggestionList([]);
          } else {
            setShowList(true);
            fetchSuggestions(e.target.value, (suggestions) => {
              setSuggestionList(suggestions);
            });
          }
        }}
      />
      {showList && (
        <Box
          bgcolor={"#fff"}
          position="absolute"
          width={"100%"}
          zIndex={9999}
          style={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "gray",
            borderRadius: 5,
          }}
        >
          {suggestionList.map((item: any, index) => {
            return (
              <ListItemButton
                component="a"
                href="#simple-list"
                key={index}
                onClick={() => {
                  setShowList(false);
                  setAddress(item?.label);
                  selectProps.onChange(item);
                }}
              >
                <ListItemText primary={item?.value?.description} />
              </ListItemButton>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default forwardRef(GooglePlacesAutocomplete);
