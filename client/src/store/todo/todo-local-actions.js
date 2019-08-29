import { Base64 } from "js-base64";
import { setLocalTasks, calcNewPage } from "./todo-utils";
import {
  clearAllTasks,
  addTasksToDB,
  fetchTasks,
  TOGGLE_DONE_TASK,
  REMOVE_TASK
} from "./todo-db-actions";

export const FETCH_LOCAL_TASKS = "FETCH_LOCAL_TASKS";
export const fetchLocalTasks = (page = 1, perPage = 5, searchTerm = "") => {
  return async (dispatch, getState) => {
    const { tasks } = getState().todo;
    const tasksFiltered = tasks.filter(({ title }) =>
      title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const total = searchTerm !== "" ? tasksFiltered.length : tasks.length;
    const newPage = calcNewPage(page, perPage, total);

    console.log(newPage);

    dispatch({
      type: FETCH_LOCAL_TASKS,
      payload: {
        total,
        page: newPage,
        tasksFiltered: tasksFiltered.slice(
          page * perPage - perPage,
          page * perPage
        )
      },
      meta: {
        searchTerm,
        asPromise: true
      }
    });
  };
};

export const saveLocalTasksToDB = () => async (dispatch, getState) => {
  const { tasks } = getState().todo;
  await dispatch(clearAllTasks());
  if (tasks.length) {
    await dispatch(addTasksToDB(tasks));
  }
};

export const ADD_TASK_TO_LOCAL = "ADD_TASK_TO_LOCAL";
export const addTaskToLocal = ({ title }) => (dispatch, getState) => {
  const createdTask = {
    id: Base64.encode(title + Math.random()),
    title,
    done: false,
    date: new Date()
  };
  setLocalTasks([createdTask, ...getState().todo.tasks]);
  return dispatch({
    type: ADD_TASK_TO_LOCAL,
    payload: createdTask,
    meta: { asPromise: true }
  });
};

export const toggleDoneTaskFromLocal = (id) => async (dispatch, getState) => {
  const { tasks } = getState().todo;
  setLocalTasks(
    tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
  );
  return dispatch({
    type: TOGGLE_DONE_TASK,
    meta: { id, asPromise: true }
  });
};

export const removeTaskFromLocal = (id) => {
  return async (dispatch, getState) => {
    const { tasks } = getState().todo;
    setLocalTasks(tasks.filter((task) => task.id !== id));
    return dispatch({
      type: REMOVE_TASK,
      meta: { id, asPromise: true }
    });
  };
};

export const INIT_LOCAL_STATE = "INIT_LOCAL_STATE";
export const initLocalState = () => ({
  type: INIT_LOCAL_STATE,
  payload: JSON.parse(localStorage.getItem("tasks")) || [],
  meta: { asPromise: true }
});
