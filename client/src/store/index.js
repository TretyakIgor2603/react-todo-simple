import axios from "axios";
import { createStore, applyMiddleware, combineReducers } from "redux";
import todoReducer from "./todo/reducer";
import authReducer from "./auth/reducer";
import noticeReducer from "./notice/notice-reducer";
import createSagaMiddleware from "redux-saga";
import {
  createRequestInstance,
  watchRequests,
  requestsPromiseMiddleware
} from "redux-saga-requests";
import { createDriver } from "redux-saga-requests-axios";
import thunk from "redux-thunk";

function* rootSaga(axiosInstance) {
  yield createRequestInstance({ driver: createDriver(axiosInstance) });
  yield watchRequests();
}

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  todo: todoReducer,
  auth: authReducer,
  notice: noticeReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, thunk, requestsPromiseMiddleware())
);

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api"
});

sagaMiddleware.run(rootSaga, axiosInstance);

export default store;
