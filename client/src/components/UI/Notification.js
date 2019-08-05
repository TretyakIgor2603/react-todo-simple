import React, { Component } from "react";
import { connect } from "react-redux";
import { notification } from "antd";

const openNotification = (title = "Error notification", errors = []) => {
  const errorsList = errors.map((error, index) => (
    <p key={index}>{error.message ? error.message : error.msg}</p>
  ));
  const args = {
    message: title,
    description: errorsList,
    duration: 5
  };
  notification.error(args);
};

class Notification extends Component {
  componentDidUpdate() {
    const { errors } = this.props;
    console.log(errors);
    openNotification(errors.message, errors.errors);
  }

  render() {
    return null;
  }
}

export default connect(({ errors }) => errors)(Notification);
