import { Base64 } from "js-base64";
import { getToken } from "../auth/actions";

export const FETCH_TASKS = "FETCH_TASKS";
export const fetchTasks = (offset = 0, limit = 5, term = "", token) => {
  return {
    type: FETCH_TASKS,
    request: {
      url: `/tasks?offset=${offset}&limit=${limit}&search=${Base64.encode(
        term
      )}`,
      method: "get",
      headers: {
        Authorization: token
      }
    },
    meta: {
      term,
      asPromise: true
    }
  };
};

export const GET_LOCAL_TASKS = "GET_LOCAL_TASKS";
export const getLocalTasks = (offset, limit, term) => {
  const tasks = [JSON.parse(localStorage.getItem("tasks"))];
  console.log(tasks);

  // логика поиска и фильтрации

  return {
    type: GET_LOCAL_TASKS,
    payload: { tasks, total: tasks.length },
    meta: {
      term
    }
  };
};

export const getTasks = (offset, limit, term) => {
  return async (dispatch, getState) => {
    const token = getToken();
    if (token) {
      await dispatch(fetchTasks(offset, limit, term, token));
    } else {
      await dispatch(getLocalTasks(offset, limit, term));
    }
  };
};

export const ADD_TASK = "ADD_TASK";
export const addTask = (title) => {
  const token = getToken();
    if (token) {
      return {
        type: ADD_TASK,
        request: {
          url: "/tasks",
          data: { title },
          method: "post",
          headers: {
            Authorization: token
          }
        },
        meta: {
          asPromise: true
        }
      };
    } else {
      const tasks = [JSON.parse(localStorage.getItem("tasks"))];
      tasks.push({id: Base64.encode(title), title, done: false})
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  
};

export const ADD_TASK_AND_FETCH = "ADD_TASK_AND_FETCH";
export const addTaskAndFetch = (title) => {
  return async (dispatch, getState) => {
    const { searchTerm, offset, limit } = getState().todo;
    await dispatch(addTask(title));
    await dispatch(fetchTasks(offset, limit, searchTerm));
  };
};

export const TOGGLE_DONE_TASK = "TOGGLE_DONE_TASK";
export const toggleDoneTask = (id) => ({
  type: TOGGLE_DONE_TASK,
  request: {
    url: `/tasks?complete=${id}`,
    data: { id },
    method: "put"
  },
  meta: {
    id
  }
});

export const REMOVE_TODO = "REMOVE_TODO";
export const removeTask = (id) => ({
  type: REMOVE_TODO,
  request: {
    url: `/tasks/${id}`,
    data: { id },
    method: "delete"
  },
  meta: {
    id,
    asPromise: true
  }
});

export const REMOVE_TODO_AND_FETCH = "REMOVE_TODO_AND_FETCH";
export const removeTaskAndFetch = (id) => {
  return async (dispatch, getState) => {
    const { searchTerm, offset, limit } = getState().todo;
    await dispatch(removeTask(id));
    await dispatch(fetchTasks(offset, limit, searchTerm));
  };
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
export const setPaginationAndFetch = (offset, limit) => {
  return async (dispatch, getState) => {
    const { searchTerm } = getState().todo;
    await dispatch(setPagination(offset, limit));
    await dispatch(fetchTasks(offset, limit, searchTerm));
  };
};

export const SET_SEARCH_TERM = "SET_SEARCH_TERM";
export const setSearchTerm = (term) => ({
  type: SET_SEARCH_TERM,
  payload: {
    data: term
  }
});
