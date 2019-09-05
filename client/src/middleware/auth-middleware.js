import _get from "lodash/fp/get";
import {
  clearAuth,
  refreshTokenAction
} from "../store/account/account-actions";
import { setAuthorizationBearer } from "../store/axios";
import axiosInstance from "../store/axios";

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
  console.log("action", action);
  if (error) {
    // if (error.response.status !== 401) {
    // 	return new Promise((resolve, reject) => {
    // 		reject(error);
    // 	});
    // }

    // Logout user if token refresh didn't work or user is disabled
    // if (error.config.url == '/auth/refresh-token' || error.response.message == 'Account is disabled.') {
    // 	// TokenStorage.clear();
    // 	console.log('CLEAR')
    // 	// router.push({ name: 'root' });

    // 	return new Promise((resolve, reject) => {
    // 		reject(error);
    // 	});
    // }

    // Try request again with new token
    const refreshToken = localStorage.getItem("refreshToken");
		refreshToken && setAuthorizationBearer(refreshToken);
    dispatch(refreshTokenAction())
      .then((token) => {
        console.log("token", token);
        // New request with new token
        const config = error.config;
        return new Promise((resolve, reject) => {
          axiosInstance
            .request(config)
            .then((response) => {
							resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
				});
      })
      .catch((error) => {
        return new Promise((resolve, reject) => {
          reject(error);
        });
			});
  }

  if (error && error.status === 401) {
    const { data } = error;

    if (data && data.expired) {
      console.log("tokenExpiredError");
      // const refreshToken = localStorage.getItem("refreshToken");
      // refreshToken && setAuthorizationBearer(refreshToken);
      // dispatch(refreshTokenAction());
    }

    if (data && data.invalid) {
      console.log("invalidToken");
      // await dispatch(clearAuth());
    }
  }

  next(action);
};
export default authMiddleware;
