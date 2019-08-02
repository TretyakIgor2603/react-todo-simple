import React from "react";
import Navigation from "./Navigation";
import Notification from "./UI/Notification";
import { BrowserRouter } from "react-router-dom";
import Layout from "./containers/Layout";
import { connect } from "react-redux";
import { fetchUsers } from "../store/auth/actions";

class App extends React.Component {
  componentDidMount() {
    // this.props.fetchUsers();
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

const mapActionsToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers())
});

export default connect(
  ({ auth }) => auth,
  mapActionsToProps
)(App);
