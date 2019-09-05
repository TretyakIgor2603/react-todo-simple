import React, { Component } from "react";
import { Form, Icon, Input, Button, Tooltip, Checkbox } from "antd";
import { connect } from "react-redux";
import {
  checkExistEmail,
  signUpProcess
} from "../../store/account/account-actions";
import { withRouter } from "react-router-dom";
import FormItem from "../ui/FormItem";

class SignUp extends Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await this.props.signUpProcess(values, values.autoLogin);
        this.props.form.resetFields();
        values.autoLogin ? history.push("/") : history.push("/login");
      }
    });
  };

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToUniqueEmail = (rule, value, callback) => {
    if (value && value !== "") {
      this.props
        .checkExistEmail(value)
        .then(() => callback())
        .catch(() => callback("This email is exist!"));
    } else {
      callback()
    }
  };

  render() {
    const { validateTrigger } = this.state;
    const { getFieldDecorator } = this.props.form;

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

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Form
        autoComplete={"off"}
        onSubmit={this.handleSubmit}
        {...formItemLayout}
        className="login-form"
      >
        <FormItem
          form={this.props.form}
          label={
            <span>
              Name&nbsp;
              <Tooltip title="For example 'Jim Carrey'">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
          name={"username"}
          validateOptions={[{ required: true, min: 3 }]}
          hasFeedback
          control={<Input />}
        />

        <FormItem
          form={this.props.form}
          label={"E-mail"}
          name={"email"}
          validateTrigger={validateTrigger}
          validateOptions={[
            { type: "email", required: true },
            { validator: this.validateToUniqueEmail }
          ]}
          hasFeedback
          control={<Input />}
        />

        <FormItem
          form={this.props.form}
          label={"Password"}
          name={"password"}
          validateTrigger={validateTrigger}
          validateOptions={[
            {
              required: true,
              min: 5,
              max: 24
            },
            { validator: this.validateToNextPassword }
          ]}
          hasFeedback
          control={<Input.Password onBlur={this.handleConfirmBlur} />}
        />

        <FormItem
          form={this.props.form}
          label={"Confirm Password"}
          name={"confirm"}
          validateTrigger={validateTrigger}
          validateOptions={[
            { required: true },
            { validator: this.compareToFirstPassword }
          ]}
          hasFeedback
          control={<Input.Password onBlur={this.handleConfirmBlur} />}
        />

        <Form.Item {...tailFormItemLayout}>
          <div>
            {getFieldDecorator("autoLogin", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Auto log in</Checkbox>)}
          </div>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapActionsToProps = (dispatch) => ({
  checkExistEmail: (email) => dispatch(checkExistEmail(email)),
  signUpProcess: (user, autoLogin) => dispatch(signUpProcess(user, autoLogin))
});

export default connect(
  ({ account }) => account,
  mapActionsToProps
)(withRouter(Form.create({ name: "sign_up" })(SignUp)));
