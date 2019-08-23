import axios from "axios";
import { getToken } from "../utils/token";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.headers.common["Authorization"] = "";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  token
    ? (config.headers["Authorization"] = token && `Bearer ${token}`)
    : delete axios.defaults.headers.common["Authorization"];
  return config;
});

export default axiosInstance;
