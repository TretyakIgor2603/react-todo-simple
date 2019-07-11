import * as todoActions from "./todo-actions";
import { success, error } from "redux-saga-requests";

const initialState = {
  tasks: [],
  searchTerm: "",
  error: null
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case todoActions.ADD_TODO:
      return {
        ...state,
        tasks: [...state.tasks, action.meta.item]
      };
    case error(todoActions.ADD_TODO):
      console.log(action);
      return {
        ...state
        // tasks: [...state.tasks, action.data]
      };
    case todoActions.FETCH_TASKS:
      return {
        ...state
      };
    case success(todoActions.FETCH_TASKS):
      return {
        ...state,
        tasks: action.data
      };
    case error(todoActions.FETCH_TASKS):
      return {
        ...state,
        error: action.error.message
      };
    case todoActions.TOGGLE_DONE_TODO:
      return {
        ...state,
        tasks: [...state.tasks]
      };
    case todoActions.REMOVE_TODO:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.meta.id)
      };
    default:
      return state;
  }
};

export default todoReducer;
