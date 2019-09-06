import axios from "axios";
import TokenService, { isTokenExpiredError } from "../utils/token";

axios.defaults.baseURL = "http://localhost:5000/api";
const axiosInstance = axios.create();

export const setAuthorizationBearer = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

//Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // If the request succeeds, we don't have to do anything and just return the response
    return response;
  },
  (error) => {
    const errorResponse = error.response;
    if (isTokenExpiredError(errorResponse)) {
      return TokenService.refreshToken(error);
    }
    // If the error is due to other reasons, we just throw it back to axios
    return Promise.reject(error);
  }
);

export default axiosInstance;
