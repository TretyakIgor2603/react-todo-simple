export const onTodoAdd = title => {
  return dispatch => {
    const id =
      Math.floor(Math.random() * 10001) +
      new Date().getMilliseconds();
    const todoItem = { id, title, done: false };
    dispatch(todoAdd(todoItem));
  };
};

export const todoAdd = item => {
  return { type: "TODO_ADD", item };
};

export const todoToggleDone = id => {
  return { type: "TODO_TOGGLE_DONE", id };
};

export const todoRemove = id => {
  return { type: "TODO_TOGGLE_REMOVE", id };
};
