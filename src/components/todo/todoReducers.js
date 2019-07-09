const initialState = {
  tasks: [
    { id: 0, title: "Walk the dog", done: false },
    { id: 1, title: "Feed the cat", done: false }
  ]
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "TODO_ADD":
      return {
        ...state,
        tasks: [...state.tasks, action.item]
      };
    case "TODO_TOGGLE_DONE":
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.id ? { ...task, done: !task.done } : task
        )
      };
    case "TODO_TOGGLE_REMOVE":
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.id)
      };
    default:
      return state;
  }
}
