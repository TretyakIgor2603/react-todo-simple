import { Base64 } from "js-base64";
import { getToken } from "../auth/auth-actions";

export const FETCH_DB_TASKS = "FETCH_DB_TASKS";
export const fetchDBTasks = (offset = 0, limit = 5, term = "") => ({
  type: FETCH_DB_TASKS,
  request: {
    url: `/tasks?offset=${offset}&limit=${limit}&search=${Base64.encode(term)}`,
    method: "get",
    headers: {
      Authorization: getToken()
    }
  },
  meta: {
    term,
    asPromise: true
  }
});

export const FETCH_LOCAL_TASKS = "FETCH_LOCAL_TASKS";
export const fetchLocalTasks = (offset = 0, limit = 5, term = "") => {
  return async (dispatch, getState) => {
    const tasks = getState().todo.tasks;
    const tasksFiltered = tasks.filter(({ title }) =>
      title.toLowerCase().includes(term.toLowerCase())
    );

    dispatch({
      type: FETCH_LOCAL_TASKS,
      payload: {
        offset,
        tasksFiltered: tasksFiltered.slice(offset, offset + limit),
        total: term !== "" ? tasksFiltered.length : tasks.length
      },
      meta: {
        term
      }
    });
  };
};

export const fetchTasks = (offset, limit, term) => async (dispatch) => {
  if (getToken()) {
    await dispatch(fetchDBTasks(offset, limit, term));
  } else {
    await dispatch(fetchLocalTasks(offset, limit, term));
  }
};

export const ADD_TASK_TO_DB = "ADD_TASK_TO_DB";
export const addTaskToDB = (title) => ({
  type: ADD_TASK_TO_DB,
  request: {
    url: "/tasks",
    data: { title },
    method: "post",
    headers: {
      Authorization: getToken()
    }
  },
  meta: { asPromise: true }
});

export const ADD_TASK_TO_LOCAL = "ADD_TASK_TO_LOCAL";
export const addTaskToLocal = (title) => async (dispatch, getState) => {
  const createdTask = {
    id: Base64.encode(title + Math.random()),
    title,
    done: false
  };
  setLocalTasks([createdTask, ...getState().todo.tasks]);
  dispatch({
    type: ADD_TASK_TO_LOCAL,
    payload: createdTask
  });
};

export const ADD_TASK_AND_FETCH = "ADD_TASK_AND_FETCH";
export const addTaskAndFetch = (title) => async (dispatch, getState) => {
  const { searchTerm, offset, limit } = getState().todo;
  if (getToken()) {
    await dispatch(addTaskToDB(title));
    await dispatch(fetchTasks(offset, limit, searchTerm));
  } else {
    await dispatch(addTaskToLocal(title));
    await dispatch(fetchLocalTasks(offset, limit, searchTerm));
  }
};

export const TOGGLE_DONE_TASK = "TOGGLE_DONE_TASK";
export const toggleDoneTaskFromDB = (id) => ({
  type: TOGGLE_DONE_TASK,
  request: {
    url: `/tasks?complete=${id}`,
    data: { id },
    method: "put",
    headers: {
      Authorization: getToken()
    }
  },
  meta: { id }
});

export const toggleDoneTaskFromLocal = (id) => {
  setLocalTasks(toggleDoneTaskFunc(getLocalTasks(), id));
  return {
    type: TOGGLE_DONE_TASK,
    meta: { id }
  };
};

export const toggleDoneTask = (id) => async (dispatch) => {
  getToken()
    ? await dispatch(toggleDoneTaskFromDB(id))
    : await dispatch(toggleDoneTaskFromLocal(id));
};

export const REMOVE_TASK = "REMOVE_TASK";
export const removeTaskFromDB = (id) => ({
  type: REMOVE_TASK,
  request: {
    url: `/tasks/${id}`,
    data: { id },
    method: "delete",
    headers: {
      Authorization: getToken()
    }
  },
  meta: {
    id,
    asPromise: true
  }
});

export const removeTaskFromLocal = (id) => {
  return async (dispatch, getState) => {
    setLocalTasks(removeTaskFunc(getState().todo.tasks, id));
    dispatch({
      type: REMOVE_TASK,
      meta: { id }
    });
  };
};

export const REMOVE_TODO_AND_FETCH = "REMOVE_TODO_AND_FETCH";
export const removeTaskAndFetch = (id) => async (dispatch, getState) => {
  const { searchTerm, offset, limit } = getState().todo;
  getToken()
    ? await dispatch(removeTaskFromDB(id))
    : await dispatch(removeTaskFromLocal(id));
  await dispatch(fetchTasks(offset, limit, searchTerm));
};

export const SET_PAGINATION = "SET_PAGINATION";
export const setPagination = (offset = 0, limit = 5) => ({
  type: SET_PAGINATION,
  payload: {
    offset,
    limit
  }
});

export const SET_PAGINATION_AND_FETCH = "SET_PAGINATION_AND_FETCH";
export const setPaginationAndFetch = (offset, limit) => async (
  dispatch,
  getState
) => {
  const { searchTerm } = getState().todo;
  await dispatch(setPagination(offset, limit));
  await dispatch(fetchTasks(offset, limit, searchTerm));
};

export const SET_SEARCH_TERM = "SET_SEARCH_TERM";
export const setSearchTerm = (term) => ({
  type: SET_SEARCH_TERM,
  payload: {
    data: term
  }
});

export const toggleDoneTaskFunc = (tasks, id) => {
  return tasks.map((task) => {
    if (task.id === id) task.done = !task.done;
    return task;
  });
};

export const removeTaskFunc = (tasks, id) => {
  return tasks.filter((task) => task.id !== id);
};

export const setLocalTasks = (tasks = []) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const getLocalTasks = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

export const INIT_LOCAL_STATE = "INIT_LOCAL_STATE";
export const initLocalState = () => ({
  type: INIT_LOCAL_STATE,
  payload: getLocalTasks()
});
