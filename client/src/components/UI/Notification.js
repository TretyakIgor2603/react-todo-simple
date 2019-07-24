import React, { Component } from "react";
import { connect } from "react-redux";
import { notification } from "antd";

const openNotification = (error) => {
  const args = {
    message: "Error notification",
    description: error,
    duration: 5
  };
  notification.error(args);
};

class Notification extends Component {
  componentDidUpdate() {
    const error = this.props.errors.message;
    if (error) openNotification(error);
  }

  render() {
    return <></>;
  }
}

export default connect(({ errors }) => errors)(Notification);
