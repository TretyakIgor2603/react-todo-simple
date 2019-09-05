import React from "react";
import { Modal as ModalAntd, Button } from "antd";

const Modal = (props) => {
  const { visible, onHide, title, children, submitText, onSubmit } = props;

  return (
    <ModalAntd
      visible={visible}
      onOk={onSubmit}
      onCancel={onHide}
      title={title}
      footer={[
        <Button key="back" onClick={onHide}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => onSubmit()}>
          {submitText || "Submit"}
        </Button>
      ]}
    >
      {children}
    </ModalAntd>
  );
};

export default Modal;
