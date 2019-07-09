import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import todoAddReducers from '../components/todo/todoReducers'

const rootReducer = combineReducers({
  todoAdd: todoAddReducers
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store
