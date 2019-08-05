import React, { Component } from "react";
import { connect } from "react-redux";
import { notification } from "antd";

const openNotification = (type, title, messages) => {
  console.log(messages)
  const messagesList = messages.map((msg, index) => (
    <p key={index}>{msg.message ? msg.message : msg.msg}</p>
  ));

  notification[type]({
    message: title,
    description: messagesList,
    duration: 5
  });
};

class Notification extends Component {
  componentDidUpdate() {
    const { type, title, messages } = this.props;
    openNotification(type, title, messages);
  }

  render() {
    return null;
  }
}

export default connect(({notice}) => notice)(Notification);
