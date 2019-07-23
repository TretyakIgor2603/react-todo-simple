import React from "react";
import { List, Icon, Checkbox } from "antd";
import styled from "styled-components";

const Item = styled(List.Item)`
  user-select: none;
`;

const TodoItem = ({ id, done, title, onToggleDone, onRemoveTodo }) => {
  return (
    <Item>
      <Checkbox
        checked={done}
        onChange={() => onToggleDone(id)}
        style={{
          textDecoration: done ? "line-through" : "none"
        }}
      >
        {title}
      </Checkbox>
      <Icon
        style={{ marginLeft: "auto" }}
        onClick={() => onRemoveTodo(id)}
        type="delete"
      />
    </Item>
  );
};

export default TodoItem;
