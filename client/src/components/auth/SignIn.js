import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { signInProcess } from "../../store/account/account-actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class SignIn extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await this.props.signInProcess(values);
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item hasFeedback>
          {getFieldDecorator("email", {
            rules: [{ required: true, type: "email" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator("password", {
            rules: [{ required: true, min: 5 }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="/">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/signup">register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedSignIn = Form.create({ name: "sign_in" })(SignIn);

const mapDispatchToProps = (dispatch) => ({
  signInProcess: (data) => dispatch(signInProcess(data))
});

export default connect(
  ({ auth }) => auth,
  mapDispatchToProps
)(withRouter(WrappedSignIn));
