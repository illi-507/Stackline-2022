import { FETCH_DATA_FAILED, FETCH_DATA_SUCCEEDED } from "../actions";

const initialState = {
  data: [],
  loaded: false,
};

export const dataFetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCEEDED:
      return {
        state: action.payload,
        loaded: true,
      };
    case FETCH_DATA_FAILED:
      return {
        state:initialState,
        loaded: false,
      };
    default:
      return state;
  }
};
