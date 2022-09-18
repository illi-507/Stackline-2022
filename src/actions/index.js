import mockApi from "../mockApi";
export const FETCH_DATA_SUCCEEDED = "FETCH_DATA_SUCCEEDED";
export const FETCH_DATA_FAILED = "FETCH_DATA_FAILED";

export const fetchDataSucceeded = (data) => {
  return {
    type: FETCH_DATA_SUCCEEDED,
    payload: data,
  };
};

export const fetchDataFailed = () => {
    return {
      type: FETCH_DATA_FAILED,
    };
  };

export const fetchData = () => {
  return (dispatch) => {
    async function mockApiCall() {
      let response = await mockApi();
      let data = await response.json();      
      if (response.ok) {
        dispatch(fetchDataSucceeded(data));
      }
      else{
        dispatch(fetchDataFailed());
      }      
    }
    mockApiCall();
  };
};
