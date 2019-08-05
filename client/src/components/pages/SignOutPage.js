import React, { Component } from "react";
import { connect } from "react-redux";
import { signOut } from "../../store/auth/actions";
import { withRouter } from "react-router-dom";

class SignOutPage extends Component {
  componentDidMount() {
    this.props.signOut()
      // .then(() => this.props.history.push("/login"))
      // .catch(() => this.props.history.push("/login"));
  }

  render() {
    return <div>Logout ...</div>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut())
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter(SignOutPage));
