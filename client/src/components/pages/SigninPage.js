import React from "react";
import { connect } from "react-redux";
import WrappedSignIn from "../auth/SignIn";
import { setError } from "../../store/errors/actions";

const unauthorizedError = {
  message: "Error authorized"
};

const SignInPage = ({ location, setError }) => {
  location.state && location.state.unauthorized && setError(unauthorizedError);
  return <WrappedSignIn />;
};

export default connect(
  null,
  { setError }
)(SignInPage);
