import React, { useState } from "react";
import { List, Icon, Checkbox, Spin } from "antd";
import styled from "styled-components";

const Item = styled(List.Item)`
  user-select: none;
`;
const spinIcon = <Icon type="loading" style={{ fontSize: "15px" }} spin />;

const TodoItem = ({ id, done, title, onToggleDone, onRemoveTodo }) => {
  const [isPending, setPending] = useState(false);

  const handleRemoveTodo = (id) => {
    setPending(true);
    onRemoveTodo(id)
      .then(() => setPending(false))
      .catch(() => setPending(false));
  };

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
      {isPending ? (
        <Spin style={{ marginLeft: "auto" }} indicator={spinIcon} />
      ) : (
        <Icon
          style={{ marginLeft: "auto" }}
          onClick={() => handleRemoveTodo(id)}
          type="delete"
        />
      )}
    </Item>
  );
};

export default TodoItem;
