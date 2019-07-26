import React, { Component } from "react";
import WrappedSignup from "../SignUp";
import WrappedSignIn from "../SignIn";

class GuestPage extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  
  render() {
    console.log(this.props)
    const {location} = this.props
    console.log(location.pathname)
    return (
      <div>
        {location.pathname === "/signup" && <WrappedSignup/>}
        {location.pathname === "/login" && <WrappedSignIn/>}
      </div>
    )
  }

}

export default GuestPage;
