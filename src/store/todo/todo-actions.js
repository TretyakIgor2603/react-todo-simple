const uuidv4 = require("uuid/v4");

export const FETCH_TASKS = "FETCH_TASKS";
export const fetchTasks = () => ({
  type: FETCH_TASKS,
  request: {
    url: "/tasks",
    method: "get"
  }
});

export const ADD_TODO = "ADD_TODO";
export const addTodo = title => {
  const item = { id: uuidv4(), title, done: false };
  return {
    type: ADD_TODO,
    request: {
      url: "/tasks",
      data: item,
      method: "post"
    },
    meta: {
      item
    }
  };
};

export const TOGGLE_DONE_TODO = "TOGGLE_DONE_TODO";
export const toggleDoneTodo = id => {
  return (dispatch, getState) => {
    // ? можно ли изменять так ?
    const item = getState().todo.tasks.find(task => task.id === id);
    item.done = !item.done;
    // ?
    dispatch({
      type: TOGGLE_DONE_TODO,
      request: {
        url: `/tasks/${id}`,
        data: item,
        method: "patch"
      },
      meta: {
        item
      }
    });
  };
};

export const REMOVE_TODO = "REMOVE_TODO";
export const removeTodo = id => {
  return {
    type: REMOVE_TODO,
    request: {
      url: `/tasks/${id}`,
      method: "delete"
    },
    meta: {
      id
    }
  };
};
