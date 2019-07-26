import React from "react";
import TodoItem from "../todo/TodoItem";
import styled from "styled-components";
import { List, Pagination } from "antd";

const TodoApp = styled.div`
  display: block;
  margin-top: 15px;
`;

const Paging = styled(Pagination)`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const TodoList = ({
  tasks,
  totalTasks,
  tasksPerPage,
  currentPage,
  onToggleDone,
  onRemoveTodo,
  onChangePaging
}) => {
  const onChange = (page) => onChangePaging(page);

  return (
    <TodoApp>
      <List
        bordered
        dataSource={tasks}
        renderItem={(item) => (
          <TodoItem
            {...item}
            onToggleDone={onToggleDone}
            onRemoveTodo={onRemoveTodo}
          />
        )}
      />
      <Paging
        simple
        defaultCurrent={1}
        current={currentPage}
        onChange={onChange}
        total={totalTasks}
        pageSize={tasksPerPage}
      />
    </TodoApp>
  );
};

export default TodoList;
