import React from "react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Layout from "./containers/Layout";
import Navbar from "./ui/Navbar";
import Navigation from "./Navigation";
import Notification from "./ui/Notification";

class App extends React.Component {
  render() {
    const { auth } = this.props;

    return (
      <BrowserRouter>
        <Layout>
          <Navbar auth={auth} />
          <Navigation />
          <Notification />
        </Layout>
      </BrowserRouter>
    );
  }
}

export default connect((auth) => auth)(App);
