import React from "react";
import TodoItem from "../todo-item/todo-item";

const TodoList = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task, index) => {
        return <TodoItem key={index} taskText={task.text} />;
      })}
    </ul>
  );
};

export default TodoList;
