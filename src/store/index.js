import axios from "axios";
import { createStore, applyMiddleware, combineReducers } from "redux";
import todoReducer from "./todo/todo-reducer";
import createSagaMiddleware from "redux-saga";
import { createRequestInstance, watchRequests } from "redux-saga-requests";
import { createDriver } from "redux-saga-requests-axios";
import thunk from "redux-thunk";

function* rootSaga(axiosInstance) {
  yield createRequestInstance({ driver: createDriver(axiosInstance) });
  yield watchRequests();
}

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  todo: todoReducer
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, thunk));

const axiosInstance = axios.create({
  baseURL: "http://localhost:3004"
});

sagaMiddleware.run(rootSaga, axiosInstance);

export default store;
