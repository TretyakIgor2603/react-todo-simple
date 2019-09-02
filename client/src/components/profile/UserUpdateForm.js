import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
const { Option } = Select;

const UserUpdateForm = ({ form, user, userRoles }) => {
  useEffect(() => {
    form.setFieldsValue({
      username: user.username,
      role: user.role
    });

    return () => {};
  }, [user]);

  const [validateTrigger, setValidateTrigger] = useState();
  const { getFieldDecorator } = form;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
        console.log("Success");
      }
    });
    console.log("handleSubmit");
  };

  // const handleSelectChange = (value, control) => {
  //   console.log(value);
  //   form.setFieldsValue({
  //     [control]: value
  //   });
  // };

  return (
    <Form
      autoComplete={"off"}
      onSubmit={handleSubmit}
      {...formItemLayout}
      className="login-form"
    >
      <Form.Item label="Name">
        {getFieldDecorator("username", {
          rules: [{ required: true }]
        })(<Input />)}
      </Form.Item>

      <Form.Item label="Role">
        {getFieldDecorator("role", {
          rules: [{ required: true }]
        })(
          <Select>
            {userRoles.map((item) => (
              <Select.Option key={item} value={item.toLowerCase()}>
                {item}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Change
        </Button>
      </Form.Item>
    </Form>
  );
};

const UserUpdateFormWithForm = Form.create({ name: "update_user" })(
  UserUpdateForm
);

export default UserUpdateFormWithForm;
