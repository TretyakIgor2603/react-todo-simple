import React, { useState } from "react";
import { Button, Input, Row, Col } from "antd";

const TodoAdd = props => {
  const [title, setTitle] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    if (title.length) {
      setTitle("");
      props.onTodoAdd(title);
    }
  };

  const onInputChange = e => setTitle(e.target.value);

  return (
    <form onSubmit={onSubmit}>
      <Row>
        <Col span={20}>
          <Input
            type="text"
            placeholder="Enter task text..."
            onChange={e => onInputChange(e)}
            value={title}
          />
        </Col>
        <Col span={4}>
          <Button type="button" block htmlType="submit">
            Add
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default TodoAdd;
