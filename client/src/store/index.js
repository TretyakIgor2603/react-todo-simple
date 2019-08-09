import axios from "axios";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import todo from "./todo/todo-reducer";
import account from "./account/account-reducer";
import notice from "./notice/notice-reducer";
import createSagaMiddleware from "redux-saga";
import {
  createRequestInstance,
  watchRequests,
  requestsPromiseMiddleware
} from "redux-saga-requests";
import { createDriver } from "redux-saga-requests-axios";
import thunk from "redux-thunk";

// ---
axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.headers.common["Authorization"] = "";

function* rootSaga(axiosInstance) {
  yield createRequestInstance({ driver: createDriver(axiosInstance) });
  yield watchRequests();
}

const sagaMiddleware = createSagaMiddleware();
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("interceptors", token);
  token
    ? (config.headers["Authorization"] = `Bearer ${token}`)
    : delete axios.defaults.headers.common["Authorization"];
  return config;
});
// ---

const rootReducer = combineReducers({ account, todo, notice });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware, thunk, requestsPromiseMiddleware())
  )
);

sagaMiddleware.run(rootSaga, axiosInstance);

export default store;
