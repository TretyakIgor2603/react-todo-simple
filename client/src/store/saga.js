import axios from "axios";
import createSagaMiddleware from "redux-saga";
import { createRequestInstance, watchRequests } from "redux-saga-requests";
import { createDriver } from "redux-saga-requests-axios";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.headers.common["Authorization"] = "";
const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  token
    ? (config.headers["Authorization"] = token && `Bearer ${token}`)
    : delete axios.defaults.headers.common["Authorization"];
  return config;
});

function* rootSaga(axiosInstance) {
  yield createRequestInstance({ driver: createDriver(axiosInstance) });
  yield watchRequests();
}

export const sagaMiddleware = createSagaMiddleware();
