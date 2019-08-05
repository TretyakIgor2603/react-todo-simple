import React from "react";
import { connect } from "react-redux";
import { setMessage } from "../../store/notice/notice-actions";
import WrappedSignIn from "../auth/SignIn";

const SignInPage = ({ location, setMessage }) => {
  location.state &&
    location.state.unauthorized &&
    setMessage({ message: "Error authorized" });
  return <WrappedSignIn />;
};

export default connect(
  null,
  { setMessage }
)(SignInPage);
