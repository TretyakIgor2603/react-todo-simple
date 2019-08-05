import * as todoActions from "./actions";
import { success } from "redux-saga-requests";

const initialState = {
  tasks: [],
  error: [],
  searchTerm: "",
  offset: 0,
  limit: 5,
  total: 0
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case success(todoActions.ADD_TASK):
      return {
        ...state,
        tasks: [action.data, ...state.tasks]
      };

    case success(todoActions.FETCH_TASKS):
      return {
        ...state,
        error: [],
        searchTerm: action.meta.term,
        tasks: action.data.tasks.data,
        total: action.data.tasks.total
      };

    case todoActions.TOGGLE_DONE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.meta.id) task.done = !task.done;
          return task;
        })
      };

    case success(todoActions.REMOVE_TODO):
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.meta.id)
      };

    case todoActions.SET_PAGINATION:
      return {
        ...state,
        offset: action.payload.offset,
        limit: action.payload.limit
      };

    default:
      return state;
  }
};

export default todoReducer;
