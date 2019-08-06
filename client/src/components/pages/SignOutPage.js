import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signOutAndLogout } from "../../store/auth/auth-actions";

class SignOutPage extends Component {
  componentDidMount = async () => {
    await this.props.signOutAndLogout();
    this.props.history.push("/login");
  };

  render() {
    return <div>Logout...</div>;
  }
}

export default connect(
  null,
  { signOutAndLogout }
)(withRouter(SignOutPage));
