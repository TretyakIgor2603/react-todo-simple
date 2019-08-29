export const setLocalTasks = (tasks = []) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const calcNewPage = (page, perPage, total) => {
  const allPages = Math.ceil(total / perPage)
  return allPages < page ? allPages > 0 ? allPages : 1 : page
};

export const setToggleDoneTask = (tasks, id) =>
  tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
