import * as todoActions from "./todo-actions";
import { success } from "redux-saga-requests";

const initialState = {
  tasks: [],
  error: [],
  searchTerm: ""
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case success(todoActions.ADD_TODO):
      return {
        ...state,
        tasks: [action.data, ...state.tasks]
      };

    case success(todoActions.FETCH_TASKS):
      return {
        ...state,
        error: [],
        tasks: action.data.tasks.data,
        totalTasks: action.data.tasks.allLength
      };

    case todoActions.TOGGLE_TODO_DONE:
      const tasks = state.tasks.map((task) => {
        if (task.id === action.meta.id) {
          task.done = !task.done;
        }
        return task;
      });
      return {
        ...state,
        tasks
      };

    case success(todoActions.REMOVE_TODO):
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.meta.id)
      };
      
    default:
      return state;
  }
};

export default todoReducer;
