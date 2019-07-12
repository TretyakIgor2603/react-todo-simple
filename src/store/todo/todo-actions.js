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

// const item = getState().todo.tasks.find(task => task.id === id);
// item.done = !item.done;

export const TOGGLE_TODO_DONE = "TOGGLE_TODO_DONE";
export const toggleTodoDone = id => ({
  type: TOGGLE_TODO_DONE,
  request: {
    url: `/tasks/${id}`,
    data: id,
    method: "patch"
  },
  meta: {
    id
  }
});

export const REMOVE_TODO = "REMOVE_TODO";
export const removeTodo = id => ({
  type: REMOVE_TODO,
  request: {
    url: `/tasks/${id}`,
    method: "delete"
  },
  meta: {
    id
  }
});
