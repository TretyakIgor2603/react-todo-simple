import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import axiosInstance from "./axios";
import createSagaMiddleware from "redux-saga";
import { sagaRequest } from "./sagas";
import { requestsPromiseMiddleware } from "redux-saga-requests";
import todo from "./todo/todo-reducer";
import notification from "./notification/notification-reducer";
import account from "./account/account-reducer";
import accountMiddleware from "./account/account-interceptor";

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
      accountMiddleware
    )
  )
);

sagaMiddleware.run(sagaRequest, axiosInstance);

export default store;
