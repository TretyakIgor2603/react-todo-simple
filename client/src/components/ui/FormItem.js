import React from "react";
import { Form } from "antd";

const FormItem = (props) => {
  const { form, label, name, validateOptions, control, hasFeedback = false, validateTrigger } = props;
  const { getFieldDecorator } = form;

  return (
    <Form.Item 
      label={label}
      hasFeedback={hasFeedback}
    >
      {getFieldDecorator(name, {
        validateTrigger,
        rules: validateOptions
      })(control)}
    </Form.Item>
  );
};

export default FormItem;
