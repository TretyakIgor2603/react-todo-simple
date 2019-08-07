import { Base64 } from "js-base64";

export const FETCH_DB_TASKS = "FETCH_DB_TASKS";
export const fetchDBTasks = (offset = 0, limit = 5, term = "") => async (
  dispatch,
  getState
) => {
  dispatch({
    type: FETCH_DB_TASKS,
    request: {
      url: `/tasks?offset=${offset}&limit=${limit}&search=${Base64.encode(
        term
      )}`,
      method: "get",
      headers: {
        Authorization: getState().auth.token
      }
    },
    meta: {
      term,
      asPromise: true
    }
  });
};

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
        term,
        asPromise: true
      }
    });
  };
};

export const fetchTasks = (offset, limit, term) => async (
  dispatch,
  getState
) => {
  if (getState().auth.isAuthenticated) {
    await dispatch(fetchDBTasks(offset, limit, term));
  } else {
    await dispatch(initLocalState());
    await dispatch(fetchLocalTasks(offset, limit, term));
  }
};

export const ADD_TASKS_TO_DB = "ADD_TASKS_TO_DB";
export const addTasksToDB = (tasks) => (dispatch, getState) => {
  return dispatch({
    type: ADD_TASKS_TO_DB,
    request: {
      url: "/tasks",
      data: tasks,
      method: "post",
      headers: {
        Authorization: getState().auth.token
      }
    },
    meta: { asPromise: true }
  });
};

export const saveLocalTasksToDB = () => async (dispatch, getState) => {
  const localTasks = getState().todo.tasks;
  await dispatch(clearLocalTasks(localTasks));
  await dispatch(addTasksToDB(localTasks));
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

export const ADD_TASK_AND_FETCH = "ADD_TASK_AND_FETCH";
export const addTasksAndFetch = (tasks) => async (dispatch, getState) => {
  const { searchTerm, offset, limit } = getState().todo;
  const { token } = getState().auth;
  if (token) {
    await dispatch(addTasksToDB(tasks));
    await dispatch(fetchTasks(offset, limit, searchTerm));
  } else {
    await dispatch(addTaskToLocal(tasks[0]));
    await dispatch(fetchLocalTasks(offset, limit, searchTerm));
  }
};

export const TOGGLE_DONE_TASK = "TOGGLE_DONE_TASK";
export const toggleDoneTaskFromDB = (id) => (dispatch, getState) => {
  return dispatch({
    type: TOGGLE_DONE_TASK,
    request: {
      url: `/tasks?complete=${id}`,
      data: { id },
      method: "put",
      headers: {
        Authorization: getState().auth.token
      }
    },
    meta: { id }
  });
};

export const toggleDoneTaskFromLocal = (id) => {
  setLocalTasks(toggleDoneTaskFunc(getLocalTasks(), id));
  return {
    type: TOGGLE_DONE_TASK,
    meta: { id }
  };
};

export const toggleDoneTask = (id) => async (dispatch, getState) => {
  getState().auth.token
    ? await dispatch(toggleDoneTaskFromDB(id))
    : await dispatch(toggleDoneTaskFromLocal(id));
};

export const REMOVE_TASK = "REMOVE_TASK";
export const removeTaskFromDB = (id) => (dispatch, getState) => {
  return dispatch({
    type: REMOVE_TASK,
    request: {
      url: `/tasks/${id}`,
      data: { id },
      method: "delete",
      headers: {
        Authorization: getState().auth.token
      }
    },
    meta: {
      id,
      asPromise: true
    }
  });
};

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
  getState().auth.token
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

export const CLEAR_LOCAL_TASKS = "CLEAR_LOCAL_TASKS";
export const clearLocalTasks = () => {
  localStorage.removeItem("tasks");
  return {
    type: CLEAR_LOCAL_TASKS,
    meta: { asPromise: true }
  }
};

export const INIT_LOCAL_STATE = "INIT_LOCAL_STATE";
export const initLocalState = () => ({
  type: INIT_LOCAL_STATE,
  payload: getLocalTasks(),
  meta: { asPromise: true }
});
