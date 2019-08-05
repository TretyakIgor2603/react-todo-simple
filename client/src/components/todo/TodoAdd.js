import React, { useState } from "react";
import { Button, Input, Row, Col, Spin } from "antd";

const TodoAdd = (props) => {
  const [title, setTitle] = useState("");
  const [isPending, setPending] = useState(false);
  const { onTodoAdd } = props;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title.length) return;

    setPending(true);
    await onTodoAdd(title)
      .then(() => setTitle(""))
      .finally(() => setPending(false));
  };

  const onInputChange = (e) => setTitle(e.target.value);

  return (
    <form onSubmit={onSubmit}>
      <Row>
        <Col span={20}>
          <Input
            type="text"
            placeholder="Enter task text..."
            onChange={(e) => onInputChange(e)}
            value={title}
          />
        </Col>
        <Col span={4}>
          <Button type="button" block htmlType="submit">
            {isPending ? <Spin size="small" /> : "Add"}
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default TodoAdd;
