export default (autocompletionRequest, input, sessionToken) => {
  const google = window.google;
  const { bounds, location, ...rest } = autocompletionRequest;

  const res = {
    input,
    ...rest,
  };

  if (sessionToken) {
    res.sessionToken = sessionToken;
  }

  if (bounds) {
    res.bounds = new google.maps.LatLngBounds(...bounds);
  }

  if (location) {
    res.location = new google.maps.LatLng(location);
  }

  return res;
};
