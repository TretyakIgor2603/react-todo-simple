import _get from "lodash/fp/get";
import {} from "../store/account/account-actions";
import { setAuthorizationBearer } from "../store/axios";

const authMiddleware = ({ dispatch }) => (next) => async (action) => {
  const payload = action.data;
  const error = _get("error", action);

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

  // If get error
  if (error && error.status === 401) {
    const { data } = error;

    if (data && data.invalid) {
      console.log("invalidToken");
      // await dispatch(clearAuth());
    }
  }

  next(action);
};
export default authMiddleware;
