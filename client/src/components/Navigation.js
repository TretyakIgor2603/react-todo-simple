import React from "react";
import TodoPage from "./pages/TodoPage";
import GuestPage from "./pages/GuestPage";
import { Route, Switch, withRouter } from "react-router-dom";

const Navigation = () => (
  <Switch>
    <Route path="/" exact component={TodoPage} />
    <Route path="/signup" component={GuestPage} />
    <Route path="/login" component={GuestPage} />
    <Route render={() => <h1>404</h1>} />
  </Switch>
);

export default withRouter(Navigation);
