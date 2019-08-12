import React from "react";
import { connect } from "react-redux";
import { setMessage } from "../../store/notice/notice-actions";
import WrappedSignIn from "../auth/SignIn";

const SignInPage = ({ location, account, setMessage }) => {
  if (location.unauthorized && !account.isLogout) {
    location.unauthorized = false;
    setMessage({
      title: "Access error!",
      message: "You don't have access to this page. Please log in."
    });
  }
  return <WrappedSignIn />;
};

export default connect(
  (account) => account,
  { setMessage }
)(SignInPage);
