import * as todoDbActions from "./todo-db-actions";
import * as todoLocalActions from "./todo-local-actions";
import { success } from "redux-saga-requests";
import { setToggleDoneTask } from "./todo-utils";

const initialState = {
  tasks: [],
  tasksFiltered: [],
  searchTerm: "",
  offset: 0,
  limit: 5,
  total: 0,
  isFetching: false
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case todoLocalActions.INIT_LOCAL_STATE:
      return {
        ...state,
        tasks: action.payload
      };

    case todoDbActions.ADD_TASKS_TO_DB:
      return {
        ...state,
        isFetching: true
      };

    case success(todoDbActions.ADD_TASKS_TO_DB):
      return {
        ...state,
        tasks: [...action.data, ...state.tasks],
        isFetching: false
      };

    case todoLocalActions.ADD_TASK_TO_LOCAL:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };

    case success(todoDbActions.FETCH_DB_TASKS):
      return {
        ...state,
        searchTerm: action.meta.term,
        tasks: action.data.tasks.data,
        total: action.data.tasks.total
      };

    case todoLocalActions.FETCH_LOCAL_TASKS:
      return {
        ...state,
        offset: action.payload.offset,
        searchTerm: action.meta.term,
        tasksFiltered: action.payload.tasksFiltered,
        total: action.payload.total
      };

    case todoDbActions.TOGGLE_DONE_TASK:
      return {
        ...state,
        tasks: setToggleDoneTask(state.tasks, action.meta.id),
        tasksFiltered: setToggleDoneTask(state.tasksFiltered, action.meta.id)
      };

    case todoDbActions.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.meta.id),
        total: state.total - 1
      };

    case todoDbActions.CLEAR_ALL_TASKS:
      return {
        ...initialState
      };

    case todoDbActions.SET_PAGINATION:
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
