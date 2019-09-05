import _get from "lodash/fp/get";
import {
  clearAuth,
  refreshTokenAction
} from "../store/account/account-actions";
import { setAuthorizationBearer } from "../store/axios";

const authMiddleware = ({dispatch}) => (next) => async (action) => {
  const payload = action.data;
  const errors = _get("error.response", action);

  // If get correct payload
  if (payload) {
    const accessToken = _get("accessToken", payload);
    const refreshToken = _get("refreshToken", payload);
    // If get tokens
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setAuthorizationBearer(accessToken);
    }
  }

  // If get errors
  if (errors && errors.status === 401) {
    const { data } = errors;

    if (data && data.expired) {
      console.log("tokenExpiredError");
      const refreshToken = localStorage.getItem("refreshToken");
      refreshToken && setAuthorizationBearer(refreshToken);
      dispatch(refreshTokenAction());
    }

    if (data && data.invalid) {
      console.log("invalidToken");
      // await dispatch(clearAuth());
    }
  }

  next(action);
};
export default authMiddleware;

