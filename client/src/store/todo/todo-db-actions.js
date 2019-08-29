import { Base64 } from "js-base64";
import {
  removeTaskFromLocal,
  toggleDoneTaskFromLocal,
  fetchLocalTasks,
  addTaskToLocal,
  initLocalState
} from "./todo-local-actions";
import { calcNewPage } from "./todo-utils";
// import { calcNewOffset } from "./todo-utils";

export const FETCH_DB_TASKS = "FETCH_DB_TASKS";
export const fetchDBTasks = (page = 1, perPage = 5, term = "") => ({
  type: FETCH_DB_TASKS,
  request: {
    // url: `/tasks?offset=${offset}&perPage=${perPage}&search=${Base64.encode(term)}`,
    url: `/tasks?page=${page}&per_page=${perPage}&search=${Base64.encode(
      term
    )}`,
    method: "get"
  },
  meta: {
    term,
    page,
    asPromise: true
  }
});

export const fetchTasks = (page, perPage, term) => async (dispatch, getState) => {
  const { account, todo } = getState();
  if (account.isAuthorized) {
    await dispatch(fetchDBTasks(page, perPage, term));
  } else {
    !todo.tasks.length && (await dispatch(initLocalState()));
    await dispatch(fetchLocalTasks(page, perPage, term));
  }
};

export const ADD_TASKS_TO_DB = "ADD_TASKS_TO_DB";
export const addTasksToDB = (tasks) => ({
  type: ADD_TASKS_TO_DB,
  request: {
    url: "/tasks",
    data: tasks,
    method: "post"
  },
  meta: { asPromise: true }
});

export const ADD_TASK_AND_FETCH = "ADD_TASK_AND_FETCH";
export const addTasksAndFetch = (tasks) => async (dispatch, getState) => {
  const { searchTerm, page, perPage } = getState().todo;
  const { isAuthorized } = getState().account;
  if (isAuthorized) {
    await dispatch(addTasksToDB(tasks));
    await dispatch(fetchTasks(page, perPage, searchTerm));
  } else {
    await dispatch(addTaskToLocal(tasks[0]));
    await dispatch(fetchLocalTasks(page, perPage, searchTerm));
  }
};

export const TOGGLE_DONE_TASK = "TOGGLE_DONE_TASK";
export const toggleDoneTaskFromDB = (id) => async (dispatch, getState) => {
  const task = { ...getState().todo.tasks.find((task) => task.id === id) };
  task.done = !task.done;
  return dispatch({
    type: TOGGLE_DONE_TASK,
    request: {
      url: `/tasks/${id}`,
      data: task,
      method: "put"
    },
    meta: { id }
  });
};

export const toggleDoneTask = (id) => async (dispatch, getState) => {
  getState().account.isAuthorized
    ? await dispatch(toggleDoneTaskFromDB(id))
    : await dispatch(toggleDoneTaskFromLocal(id));
};

export const REMOVE_TASK = "REMOVE_TASK";
export const removeTaskFromDB = (id) => ({
  type: REMOVE_TASK,
  request: {
    url: `/tasks/${id}`,
    method: "delete"
  },
  meta: {
    id,
    asPromise: true
  }
});

export const REMOVE_TODO_AND_FETCH = "REMOVE_TODO_AND_FETCH";
export const removeTaskAndFetch = (id) => async (dispatch, getState) => {
  getState().account.isAuthorized
    ? await dispatch(removeTaskFromDB(id))
    : await dispatch(removeTaskFromLocal(id));

  const { page, perPage, total, searchTerm } = getState().todo;
  const newPage = calcNewPage(page, perPage, total);
  await dispatch(fetchTasks(newPage, perPage, searchTerm));
};

export const SET_PAGINATION = "SET_PAGINATION";
export const setPagination = (page = 1, perPage = 5) => ({
  type: SET_PAGINATION,
  payload: {
    page,
    perPage
  }
});

export const SET_PAGINATION_AND_FETCH = "SET_PAGINATION_AND_FETCH";
export const setPaginationAndFetch = (page, perPage) => async (
  dispatch,
  getState
) => {
  const { searchTerm } = getState().todo;
  await dispatch(setPagination(page, perPage));
  await dispatch(fetchTasks(page, perPage, searchTerm));
};

export const SET_SEARCH_TERM = "SET_SEARCH_TERM";
export const setSearchTerm = (term) => ({
  type: SET_SEARCH_TERM,
  payload: {
    data: term
  }
});

export const CLEAR_ALL_TASKS = "CLEAR_ALL_TASKS";
export const clearAllTasks = () => {
  localStorage.removeItem("tasks");
  return {
    type: CLEAR_ALL_TASKS,
    meta: { asPromise: true }
  };
};
