import React, { useState } from "react";
import { List, Icon, Checkbox, Spin, Popconfirm } from "antd";
import styled from "styled-components";

const Item = styled(List.Item)`
  user-select: none;
  padding: 0;
`;

const CheckboxItem = styled(Checkbox)`
  padding: 12px 0;
  flex: 2;
`;
const spinIcon = <Icon type="loading" style={{ fontSize: "15px" }} spin />;

const TodoItem = ({ id, done, title, onToggleDone, onRemoveTodo }) => {
  const [isPending, setPending] = useState(false);

  const handleRemoveTodo = (id) => {
    setPending(true);
    onRemoveTodo(id).catch(() => setPending(false));
  };

  return (
    <Item>
      <CheckboxItem
        checked={done}
        onChange={() => onToggleDone(id)}
        style={{
          textDecoration: done ? "line-through" : "none"
        }}
      >
        {title}
      </CheckboxItem>
      {isPending ? (
        <Spin style={{ marginLeft: "auto" }} indicator={spinIcon} />
      ) : (
        <Popconfirm
          placement="topRight"
          title={"Are you sure to delete this task?"}
          onConfirm={() => handleRemoveTodo(id)}
          okText="Yes"
          cancelText="No"
        >
          <Icon style={{ marginLeft: "auto" }} type="delete" />
        </Popconfirm>
      )}
    </Item>
  );
};

export default TodoItem;
