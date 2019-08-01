import React from "react";
import TodoPage from "./pages/TodoPage";
import { Route, Switch, withRouter } from "react-router-dom";
import SignUpPage from "./pages/SignupPage";
import SignInPage from "./pages/SigninPage";

const Navigation = () => (
  <Switch>
    <Route path="/" exact component={TodoPage} />
    <Route path="/signup" component={SignUpPage} />
    <Route path="/login" component={SignInPage} />
    <Route render={() => <h1>404</h1>} />
  </Switch>
);

export default withRouter(Navigation);
