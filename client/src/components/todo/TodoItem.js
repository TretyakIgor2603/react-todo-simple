import React, { useState, useEffect, useRef } from "react";
import { List, Icon, Checkbox, Spin } from "antd";
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
	let isMounted = useRef(false);
  const [isPending, setPending] = useState(false);

  const handleRemoveTodo = (id) => {
    setPending(true);
    onRemoveTodo(id)
      .then(() => isMounted.current && setPending(false))
      .catch(() => isMounted.current && setPending(false));
  };

  useEffect(() => {
		isMounted.current = true;
    return () => isMounted.current = false;
  }, []);

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
        <Icon
          onClick={() => handleRemoveTodo(id)}
          style={{ marginLeft: "auto" }}
          type="delete"
        />
      )}
    </Item>
  );
};

export default TodoItem;
