import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./containers/Layout";
import Navbar from "./ui/Navbar";
import Navigation from "./Navigation";
import Notification from "./ui/Notification";
import {
  getAccessTokenFromLocalStorage,
  getUserIdFromToken
} from "../utils/token";
import { setAuthorizationBearer } from "../store/axios";
import {
  setAuthorized,
  fetchUsersRoles,
  fetchCurrentUser
} from "../store/account/account-actions";
import { connect } from "react-redux";

class App extends React.Component {
  state = {
    loading: true
  };

  async componentDidMount() {
    const { fetchUsersRoles, fetchCurrentUser } = this.props;
    const accessToken = getAccessTokenFromLocalStorage();
    await fetchUsersRoles();
    
    if (accessToken) {
      this.props.setAuthorized();
      setAuthorizationBearer(accessToken);
      await fetchCurrentUser(getUserIdFromToken()).catch(() =>
        this.setState({ loading: false })
      );
    }
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { userRoles } = this.props;
    
    return (
      <>
        {!loading && (
          <BrowserRouter>
            <Layout>
              <Navbar />
              <Navigation userRoles={userRoles} />
              <Notification />
            </Layout>
          </BrowserRouter>
        )}
      </>
    );
  }
}

export default connect(
  ({ account }) => account,
  { setAuthorized, fetchUsersRoles, fetchCurrentUser }
)(App);
