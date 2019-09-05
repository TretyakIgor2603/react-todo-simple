import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

axios.defaults.baseURL = "http://localhost:5000/api";

export const setAuthorizationBearer = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Function that will be called to refresh authorization
// const refreshAuthLogic = (failedRequest) => {
//   axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("refreshToken")}`;
//   return axiosInstance.post("/auth/refresh-token").then((tokenRefreshResponse) => {
//     failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.accessToken;
//     return Promise.resolve();
//   });
// };

const axiosInstance = axios.create();
// createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);


export default axiosInstance
