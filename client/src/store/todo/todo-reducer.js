import * as todoActions from "./todo-actions";
import { success } from "redux-saga-requests";

const initialState = {
  tasks: [],
  tasksFiltered: [],
  searchTerm: "",
  offset: 0,
  limit: 5,
  total: 0
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case todoActions.INIT_LOCAL_STATE:
      return {
        ...state,
        tasks: action.payload,
        tasksFiltered: action.payload
      };

    case success(todoActions.ADD_TASK_TO_DB):
      return {
        ...state,
        tasks: [action.data, ...state.tasks]
      };

    case todoActions.ADD_TASK_TO_LOCAL:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };

    case success(todoActions.FETCH_DB_TASKS):
      return {
        ...state,
        searchTerm: action.meta.term,
        tasks: action.data.tasks.data,
        total: action.data.tasks.total
      };

    case todoActions.FETCH_LOCAL_TASKS:
      return {
        ...state,
        offset: action.payload.offset,
        searchTerm: action.meta.term,
        tasksFiltered: action.payload.tasksFiltered,
        total: action.payload.total
      };

    case todoActions.TOGGLE_DONE_TASK:
      return {
        ...state,
        tasks: todoActions.toggleDoneTaskFunc(state.tasks, action.meta.id)
      };

    case todoActions.REMOVE_TASK:
      return {
        ...state,
        tasks: todoActions.removeTaskFunc(state.tasks, action.meta.id)
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
