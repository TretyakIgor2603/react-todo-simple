import { createRequestInstance, watchRequests } from "redux-saga-requests";
import { createDriver } from "redux-saga-requests-axios";
import axiosInstance from "./axios";

export function* sagaRequest() {
  yield createRequestInstance({ driver: createDriver(axiosInstance) });
  yield watchRequests();
}