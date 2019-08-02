export const SET_ERROR = "SET_ERROR";
export const setError = (errors) => ({
  type: SET_ERROR,
  payload: {
    errors
  }
});
