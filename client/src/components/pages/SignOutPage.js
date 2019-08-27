import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signOutProcess } from "../../store/account/account-actions";

class SignOutPage extends Component {
  async componentDidMount() {
    await this.props.signOutProcess();
    this.props.history.push("/login");
  }

  render() {
    return <div>Logout...</div>;
  }
}

export default connect(
  null,
  { signOutProcess }
)(withRouter(SignOutPage));
