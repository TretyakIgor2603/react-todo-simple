import React from "react";
import TodoItem from "../todo/TodoItem";
import styled from "styled-components";

const TodoApp = styled.div`
  display: block;
  max-width: 221px;
  margin-top: 15px;
`;

const TodoList = ({ tasks, onToggleDone, onTodoRemove }) => {
  return (
    <TodoApp>
      {tasks.map((task, index) => {
        const { id, title, done } = task;
        return (
          <TodoItem
            key={index}
            title={title}
            done={done}
            onToggleDone={() => onToggleDone(id)}
            onTodoRemove={() => onTodoRemove(id)}
          />
        );
      })}
    </TodoApp>
  );
};

export default TodoList;
