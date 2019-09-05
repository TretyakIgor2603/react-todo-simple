import React from "react";
import { Form, Input, Select } from "antd";
import FormItem from "../ui/FormItem";
const { Option } = Select;

const UserUpdateForm = Form.create({ name: "update_user" })(
  class extends React.Component {
    setDataToFields = () => {
      const { form, user } = this.props;

      form.setFieldsValue({
        username: user.username,
        role: user.role
      });
    };

    componentDidMount() {
      this.setDataToFields();
    }

    componentDidUpdate(prevProps) {
      if (this.props.user.id !== prevProps.user.id) {
        this.setDataToFields();
      }
    }

    render() {
      const { form, userRoles, onFormSubmit } = this.props;

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

      return (
        <Form
          autoComplete={"off"}
          onSubmit={onFormSubmit}
          {...formItemLayout}
          className="login-form"
        >
          <FormItem
            form={form}
            label={"Name"}
            name={"username"}
            validateOptions={[{ required: true }]}
            control={<Input />}
          />

          <FormItem
            form={form}
            label={"Role"}
            name={"role"}
            validateOptions={[{ required: true }]}
            control={
              <Select>
                {Object.keys(userRoles).map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            }
          />
        </Form>
      );
    }
  }
);

export default UserUpdateForm;
