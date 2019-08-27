import axios from "axios";
import { Service } from "axios-middleware";
import { setToken, checkResponseOnToken } from "../utils/token";

export const setAuthorizationBearer = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

axios.defaults.baseURL = "http://localhost:5000/api";

const service = new Service(axios);

service.register({
  onResponse(response) {
    const token = checkResponseOnToken(response);
    if (token) {
      setToken(token);
      setAuthorizationBearer(token);
    }

    return response;
  }
});

const axiosInstance = axios.create();

export default axiosInstance;
