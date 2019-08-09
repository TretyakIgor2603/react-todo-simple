import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signOut } from "../../store/account/account-actions";

class SignOutPage extends Component {
  componentDidMount = async () => {
    await this.props.signOut();
    this.props.history.push("/login");
  };

  render() {
    return <div>Logout...</div>;
  }
}

export default connect(
  null,
  { signOut }
)(withRouter(SignOutPage));
