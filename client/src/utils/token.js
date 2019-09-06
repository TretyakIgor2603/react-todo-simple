import axios from "axios";
import { setAuthorizationBearer } from "../store/axios";
import _get from "lodash/fp/get";
import JwtDecode from "jwt-decode";

export const isTokenExpiredError = (errorResponse) => {
  return errorResponse.status === 401 && _get("data.expired", errorResponse);
};

class TokenService {
  static getUserIdFromToken() {
    return JwtDecode(this.getAccessToken()).id;
  }

  static getAccessToken() {
    return localStorage.getItem("accessToken") || null;
  }

  static getRefreshToken() {
    return localStorage.getItem("refreshToken") || null;
  }

  static clearAllTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  // reset token and reattempt request
  static async refreshToken(error) {
    // This is the list of waiting requests that will retry after the JWT refresh complete
    let subscribers = [];
    let isAlreadyFetchingAccessToken = false;

    const onAccessTokenFetched = (access_token) => {
      // When the refresh is successful, we start retrying the requests one by one and empty the queue
      subscribers.forEach((callback) => callback(access_token));
      subscribers = [];
    };

    const addSubscriber = (callback) => {
      subscribers.push(callback);
    };

    try {
      const { response: errorResponse } = error;
      const refreshToken = this.getRefreshToken(); // Your own mechanism to get the refresh token to refresh the JWT token
      if (!refreshToken) {
        // We can't refresh, throw the error anyway
        return Promise.reject(error);
      }
      /* Proceed to the token refresh procedure
      We create a new Promise that will retry the request,
      clone all the request configuration from the failed
      request in the error object. */
      const retryOriginalRequest = new Promise((resolve) => {
        /* We need to add the request retry to the queue
      since there another request that already attempt to
      refresh the token */
        addSubscriber((access_token) => {
          errorResponse.config.headers.Authorization = "Bearer " + access_token;
          resolve(axios(errorResponse.config));
        });
      });
      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;
        const response = await axios({
          method: "post",
          url: `/auth/refresh-token/`,
          data: {
            token: refreshToken
          }
        });
        if (!response.data) {
          return Promise.reject(error);
        }
        const newToken = response.data.accessToken;
        // save the newly refreshed token for other requests to use
        isAlreadyFetchingAccessToken = false;
        onAccessTokenFetched(newToken);
      }
      return retryOriginalRequest;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default TokenService;
