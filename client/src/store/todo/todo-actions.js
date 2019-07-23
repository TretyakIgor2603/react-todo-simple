export const FETCH_TASKS = "FETCH_TASKS";
export const fetchTasks = () => ({
  type: FETCH_TASKS,
  request: {
    url: "/tasks",
    method: "get"
  }
});

export const SEARCH_TASKS = "SEARCH_TASKS";
export const searchTasks = term => {
  if (!term || term.length === 0) {
    return fetchTasks()
  }
  return {
    type: SEARCH_TASKS,
    request: {
      url: `/tasks/search/${term}`,
      data: { term },
      method: "get"
    }
  };
};

export const ADD_TODO = "ADD_TODO";
export const addTodo = title => {
  return {
    type: ADD_TODO,
    request: {
      url: "/tasks",
      data: { title },
      method: "post"
    },
    meta: {
      title
    }
  };
};

// const item = getState().todo.tasks.find(task => task.id === id);
// item.done = !item.done;

export const TOGGLE_TODO_DONE = "TOGGLE_TODO_DONE";
export const toggleTodoDone = id => ({
  type: TOGGLE_TODO_DONE,
  request: {
    url: `/tasks/toggle/${id}`,
    data: { id },
    method: "put"
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
    data: { id },
    method: "delete"
  },
  meta: {
    id
  }
});
