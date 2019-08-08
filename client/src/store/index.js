import axios from "axios";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import todoReducer from "./todo/todo-reducer";
import authReducer from "./auth/auth-reducer";
import userReducer from "./user/user-reducer";
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
  auth: authReducer,
  user: userReducer,
  todo: todoReducer,
  notice: noticeReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware, thunk, requestsPromiseMiddleware())
  )
);

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api"
});

sagaMiddleware.run(rootSaga, axiosInstance);

export default store;