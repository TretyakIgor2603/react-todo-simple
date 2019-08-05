import React, { Component } from "react";
import { Form, Icon, Input, Button, Tooltip, Checkbox } from "antd";
import { connect } from "react-redux";
import { checkExistEmail, signUpAndLogin } from "../../store/auth/actions";
import { withRouter } from "react-router-dom";

class SignUp extends Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await this.props.signUpAndLogin(values, values.autoLogin);
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
    this.props
      .checkExistEmail(value)
      .then(() => callback())
      .catch(() => callback("This email is exist!"));
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
        <Form.Item
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="For example 'RobotVasya'">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
          hasFeedback
        >
          {getFieldDecorator("nickname", {
            rules: [{ required: true, min: 3 }]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="E-mail" hasFeedback>
          {getFieldDecorator("email", {
            validateTrigger,
            rules: [
              { type: "email", required: true },
              { validator: this.validateToUniqueEmail }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator("password", {
            validateTrigger,
            rules: [
              {
                required: true,
                min: 5,
                max: 24
              },
              { validator: this.validateToNextPassword }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>

        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator("confirm", {
            validateTrigger,
            rules: [
              { required: true },
              { validator: this.compareToFirstPassword }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <div>
            {getFieldDecorator("autoLogin", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Log in immediately</Checkbox>)}
          </div>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedSignUp = Form.create({ name: "sign_up" })(SignUp);

const mapActionsToProps = (dispatch) => ({
  checkExistEmail: (email) => dispatch(checkExistEmail(email)),
  signUpAndLogin: (user, autoLogin) => dispatch(signUpAndLogin(user, autoLogin))
});

export default connect(
  ({ auth }) => auth,
  mapActionsToProps
)(withRouter(WrappedSignUp));
