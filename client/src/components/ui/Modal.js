import React from "react";
import { Modal, Button } from "antd";

const ModalWrap = (props) => {
  const showModal = () => {
    this.setState({
      visible: true
    });
  };

  const handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  const handleCancel = () => {
    this.setState({ visible: false });
  };

  const { visible } = props;
  return (
    <Modal
      visible={visible}
      title="Title"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Return
        </Button>,
        // <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>
      ]}
    >
      {props.children}
    </Modal>
  );
};

export default ModalWrap;
