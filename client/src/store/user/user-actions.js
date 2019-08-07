export const FETCH_USER_DATA = "FETCH_USER_DATA";
export const fetchUserData = () => async (dispatch, getState) => {
  const { isAuthenticated, token } = getState().auth;
  isAuthenticated &&
    dispatch({
      type: FETCH_USER_DATA,
      request: {
        url: `/user/`,
        method: "get",
        headers: {
          Authorization: token
        }
      },
      meta: { token, asPromise: true }
    });
};
