import React from "react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Layout from "./containers/Layout";
import Navbar from "./ui/Navbar";
import Navigation from "./Navigation";
import Notification from "./ui/Notification";
import { checkAuthorized } from "../store/account/account-actions";
import { getToken } from "../utils/token";

class App extends React.Component {
  async componentDidMount() {
    getToken() && await this.props.checkAuthorized();
  }

  render() {
    const { account } = this.props;

    return (
      <BrowserRouter>
        <Layout>
          <Navbar account={account} />
          <Navigation />
          <Notification />
        </Layout>
      </BrowserRouter>
    );
  }
}

export default connect(
  (account) => account,
  { checkAuthorized }
)(App);
