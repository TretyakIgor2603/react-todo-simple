import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import axiosInstance from "./axios";
import createSagaMiddleware from "redux-saga";
import { sagaRequest } from "./sagas";
import { requestsPromiseMiddleware } from "redux-saga-requests";
import authMiddleware from "../middleware/auth-middleware";
import todo from "./todo/todo-reducer";
import account from "./account/account-reducer";
import notification from "./notification/notification-reducer";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ account, todo, notification });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      thunk,
      requestsPromiseMiddleware(),
      authMiddleware
    )
  )
);

sagaMiddleware.run(sagaRequest, axiosInstance);

export default store;
