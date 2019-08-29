import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./containers/Layout";
import Navbar from "./ui/Navbar";
import Navigation from "./Navigation";
import Notification from "./ui/Notification";
import { getTokenFromLocalStorage } from "../utils/token";
import { setAuthorizationBearer } from "../store/axios";
import { setAuthorized } from "../store/account/account-actions";
import { connect } from "react-redux";

class App extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const token = getTokenFromLocalStorage();
    if (token) {
      this.props.setAuthorized();
      setAuthorizationBearer(token);
    }
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    return (
      <>
        {!loading && (
          <BrowserRouter>
            <Layout>
              <Navbar />
              <Navigation />
              <Notification />
            </Layout>
          </BrowserRouter>
        )}
      </>
    );
  }
}

export default connect(
  null,
  { setAuthorized }
)(App);
