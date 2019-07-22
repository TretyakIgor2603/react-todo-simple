import React from "react";
import { List, Icon, Checkbox } from "antd";

const TodoItem = ({ id, done, title, onToggleDone, onTodoRemove }) => {
  return (
    <List.Item>
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
        onClick={() => onTodoRemove(id)}
        type="delete"
      />
    </List.Item>
  );
};

export default TodoItem;
