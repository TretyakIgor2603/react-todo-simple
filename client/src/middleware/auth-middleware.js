import _get from "lodash/fp/get";
import { clearAuth } from "../store/account/account-actions";
import { setTokenToLocalStorage } from "../utils/token";
import { setAuthorizationBearer } from "../store/axios";

const authMiddleware = ({ dispatch }) => (next) => (action) => {
  const payload = action.data;
  const errors = _get("error.response", action);

  // If get correct payload
  if (payload) {
    // If get token
    const token = payload && payload.token;
    if (token) {
      setTokenToLocalStorage(token);
      setAuthorizationBearer(token);
    }
  }

  if (errors && errors.status === 401) {
    const { data } = errors;

    if (data && (data.tokenExpiredError || !data.validToken)) {
      console.log("tokenExpiredError && invalidToken");
      dispatch(clearAuth());
    }
  }

  next(action);
};
export default authMiddleware;
