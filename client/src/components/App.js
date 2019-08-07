import React from "react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { checkLogged } from "../store/auth/auth-actions";
import { Skeleton } from "antd";
import Layout from "./containers/Layout";
import Navbar from "./UI/Navbar";
import Navigation from "./Navigation";
import Notification from "./UI/Notification";

class App extends React.Component {
  state = {
    loading: true
  };
  componentDidMount = async () => {
    await this.props.checkLogged();
    this.setState({ loading: false });
  };

  render() {
    const { loading } = this.state;
    const { auth } = this.props;

    return (
      <BrowserRouter>
        <Layout>
          {loading ? (
            <Skeleton active paragraph={{ rows: 10 }} />
          ) : (
            <>
              <Navbar auth={auth} />
              <Navigation />
              <Notification />
            </>
          )}
        </Layout>
      </BrowserRouter>
    );
  }
}

export default connect(
  (auth) => auth,
  { checkLogged }
)(App);
