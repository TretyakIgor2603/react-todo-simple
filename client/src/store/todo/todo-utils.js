export const setLocalTasks = (tasks = []) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const calcNewOffset = (total, offset, limit) => {
  const allPages = Math.ceil(total / limit);
  const currentPage = offset / limit + 1;
  const newOffset = allPages < currentPage ? offset - limit : offset;
  return newOffset < 0 ? 0 : newOffset;
};

export const setToggleDoneTask = (tasks, id) =>
  tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
