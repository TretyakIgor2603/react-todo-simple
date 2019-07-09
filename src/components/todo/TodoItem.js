import React from "react";
import styled, { css } from "styled-components";

const TodoItem = ({ done, title, onToggleDone, onTodoRemove }) => {
  const TodoWrap = styled.label`
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 5px;
  `;
  const TodoItem = styled.span`
    user-select: none;
    ${done &&
      css`
        text-decoration: line-through;
        color: #ccc;
      `}
  `;
  const RemoveTodo = styled.span`
    font-size: 10px;
    margin-left: auto;
  `;

  return (
    <TodoWrap>
      <input type="checkbox" checked={done} onChange={onToggleDone} />
      <TodoItem>{title}</TodoItem>
      <RemoveTodo onClick={onTodoRemove}>Remove</RemoveTodo>
    </TodoWrap>
  );
};

export default TodoItem;
