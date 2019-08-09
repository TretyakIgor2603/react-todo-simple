import React from "react";
import { connect } from "react-redux";
import { setMessage } from "../../store/notice/notice-actions";
import WrappedSignIn from "../auth/SignIn";

const SignInPage = ({ location, auth, setMessage }) => {
  if (location.unauthorized && !auth.isLogout) {
    location.unauthorized = false;
    setMessage({
      title: "Access error!",
      message: "You don't have access to this page. Please log in."
    });
  }
  return <WrappedSignIn />;
};

export default connect(
  (auth) => auth,
  { setMessage }
)(SignInPage);
