import React, { useState } from "react";

const TodoAdd = props => {
  const [title, setTitle] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    if (title.length) {
      setTitle("");
      props.onTodoAdd(title);
    }
  };

  const onInputChange = e => setTitle(e.target.value);

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Enter task text..."
        onChange={e => onInputChange(e)}
        value={title}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoAdd;
