import React, { useState } from "react";
import { Button, Input, Row, Col, Spin, Modal, Checkbox } from "antd";

const TodoAdd = (props) => {
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [isPending, setPending] = useState(false);
  const { onTodoAdd, auth } = props;

  const contentModal = (
    <>
      <p>
        {
          "You work in guest mode. After flushing the cache, all data will be deleted. To save information, please register or log in."
        }
      </p>
      <Checkbox onChange={(e) => setShowModal(!e.target.checked)}>
        Don't show again
      </Checkbox>
    </>
  );

  const openWarningModal = (e) => {
    Modal.confirm({
      title: "Attention!",
      content: contentModal,
      icon: "exclamation-circle",
      onOk() {
        onSubmit(e);
      },
      onCancel() {},
      okText: "Okay",
      cancelText: "Cancel"
    });
  };

  const onSubmit = async () => {
    if (!title.length) return;
    setPending(true);
    await onTodoAdd(title)
      .then(() => setTitle(""))
      .finally(() => setPending(false));
  };

  const onInputChange = (e) => setTitle(e.target.value);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        auth.isAuthenticated || !showModal ? onSubmit() : openWarningModal(e);
      }}
    >
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
