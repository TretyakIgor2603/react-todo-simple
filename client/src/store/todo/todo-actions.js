import { Base64 } from "js-base64";

export const FETCH_TASKS = "FETCH_TASKS";
export const fetchTasks = (term, offset, limit) => {
  return {
    type: FETCH_TASKS,
    request: {
      url: `/tasks?search=${Base64.encode(term)}&offset=${offset}&limit=${limit}`,
      method: "get"
    },
    meta: {
      asPromise: true
    }
  }
}

// export const SEARCH_TASKS = "SEARCH_TASKS";
// export const searchTasks = (term, limit) => {
//   return {
//     type: SEARCH_TASKS,
//     request: {
//       url: `/tasks?search=${Base64.encode(term)}&limit=${limit}`,
//       method: "get"
//     },
//     meta: {
//       asPromise: true
//     }
//   };
// };

export const ADD_TODO = "ADD_TODO";
export const addTodo = (title) => {
  return {
    type: ADD_TODO,
    request: {
      url: "/tasks",
      data: { title },
      method: "post"
    },
    meta: {
      asPromise: true
    }
  };
};

export const TOGGLE_TODO_DONE = "TOGGLE_TODO_DONE";
export const toggleDoneTodo = (id) => ({
  type: TOGGLE_TODO_DONE,
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
