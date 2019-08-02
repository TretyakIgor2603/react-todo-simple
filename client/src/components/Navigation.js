import React from "react";
import TodoPage from "./pages/TodoPage";
import { Route, Switch, withRouter } from "react-router-dom";
import PrivateRoute from "./hoc/PrivateRoute";
import SignUpPage from "./pages/SignupPage";
import SignInPage from "./pages/SigninPage";
import ProfilePage from "./pages/ProfilePage";
import { connect } from "react-redux";

const Navigation = ({ auth }) => (
  <Switch>
    <Route path="/" exact component={TodoPage} />
    <PrivateRoute exact path="/profile" component={ProfilePage} />
    {!auth ? (
      <>
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={SignInPage} />
      </>
    ) : (
      <Route path="/logout" component={SignInPage} />
    )}
    <Route render={() => <h1>404</h1>} />
  </Switch>
);

export default withRouter(connect(({ auth }) => auth)(Navigation));
