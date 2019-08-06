import React from "react";
import Navigation from "./Navigation";
import Notification from "./UI/Notification";
import { BrowserRouter } from "react-router-dom";
import Layout from "./containers/Layout";
import { connect } from "react-redux";
import { checkLogged } from "../store/auth/auth-actions";

class App extends React.Component {
  componentDidMount() {
    this.props.checkLogged();
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Navigation />
          <Notification />
        </Layout>
      </BrowserRouter>
    );
  }
}

export default connect(
  ({auth}) => auth,
  { checkLogged }
)(App);
