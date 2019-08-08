export const setToken = () => async (dispatch, getState) => {
  localStorage.setItem("token", JSON.stringify(getState().auth.token));
};

export const getToken = () => {
  return JSON.parse(localStorage.getItem("token")) || null;
};