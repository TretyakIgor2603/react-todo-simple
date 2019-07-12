import React from "react";
import TodoItem from "../todo/TodoItem";
import styled from "styled-components";
import { List } from "antd";

const TodoApp = styled.div`
  display: block;
  margin-top: 15px;
`;

const TodoList = ({ tasks, currentPage, sizePage, onToggleDone, onTodoRemove, onChangePaging }) => {

  const paginationSettings = {
    simple: true,
    pageSize: sizePage,
    hideOnSinglePage: true,
    size: 'small',
    current: currentPage,
    onChange: onChangePaging
  };

  return (
    <TodoApp>
      <List
        bordered
        dataSource={tasks}
        pagination={tasks.length > sizePage ? paginationSettings : false}
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
