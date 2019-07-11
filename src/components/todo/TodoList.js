import React from "react";
import TodoItem from "../todo/TodoItem";
import styled from "styled-components";
import { List } from "antd";

const TodoApp = styled.div`
  display: block;
  margin-top: 15px;
`;

const tasksPerPage = 5
const paginationSettings = {
  simple: true,
  pageSize: tasksPerPage,
  hideOnSinglePage: true,
  size: 'small'
};

const TodoList = ({ tasks, onToggleDone, onTodoRemove }) => {
  return (
    <TodoApp>
      <List
        bordered
        dataSource={tasks}
        pagination={tasks.length > tasksPerPage ? paginationSettings : false}
        renderItem={item => (
          <TodoItem
            {...item}
            onToggleDone={onToggleDone}
            onTodoRemove={onTodoRemove}
          />
        )}
      />
    </TodoApp>
  );
};

export default TodoList;
