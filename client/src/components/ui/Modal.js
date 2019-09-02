import React from "react";
import { Modal as ModalAntd, Button } from "antd";

const Modal = ({ isShowing, hide, title, children }) => {
  const handleOk = () => {
    console.log("handleOk");
  };

  return (
    <ModalAntd
      visible={isShowing}
      onOk={handleOk}
      onCancel={hide}
      title={title}
      footer={[
        <Button key="back" onClick={hide}>
          Return
        </Button>,
        // <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
        <Button key="submit" type="primary" onClick={hide}>
          Submit
        </Button>
      ]}
    >
      {children}
    </ModalAntd>
  );
};

export default Modal;
