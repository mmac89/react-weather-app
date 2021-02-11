export const initialState = {
  latitude: null,
  longitude: null,
  weather: null,
  term: null,
};

export const actionTypes = {
  SET_LATITUDE: "SET_LATITUDE",
  SET_LONGITUDE: "SET_LONGITUDE",
  SET_WEATHER: "SET_WEATHER",
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionTypes.SET_LATITUDE:
      return {
        ...state,
        latitude: action.latitude,
      };
    case actionTypes.SET_LONGITUDE:
      return {
        ...state,
        longitude: action.longitude,
      };
    case actionTypes.SET_WEATHER:
      return {
        ...state,
        weather: action.weather,
      };
    case actionTypes.SET_SEARCH_TERM:
      return {
        ...state,
        term: action.term,
      };
    default:
      return state;
  }
};

export default reducer;
