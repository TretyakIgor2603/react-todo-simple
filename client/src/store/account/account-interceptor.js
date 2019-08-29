import { clearAuth } from "./account-actions";
import _get from "lodash/fp/get";

const accountInterceptor = ({ dispatch }) => (next) => (action) => {
  const response = _get("error.response", action);

  if (response && response.status === 401) {
    const { data } = response;

    if (data && (data.tokenExpiredError || !data.validToken)) {
      console.log("tokenExpiredError && invalidToken");
      dispatch(clearAuth());
    }
  }
  next(action);
};
export default accountInterceptor;
