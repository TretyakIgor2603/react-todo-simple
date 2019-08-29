import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api";

export const setAuthorizationBearer = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const axiosInstance = axios.create();
export default axiosInstance;
