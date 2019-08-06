import React from "react";
import TodoPage from "./pages/TodoPage";
import { Route, Switch, withRouter, Link, Redirect } from "react-router-dom";
import PrivateRoute from "./hoc/PrivateRoute";
import SignUpPage from "./pages/SignupPage";
import SignInPage from "./pages/SigninPage";
import SignOutPage from "./pages/SignOutPage";
import ProfilePage from "./pages/ProfilePage";
import PublicRoute from "./hoc/PublicRoute";

const Navigation = () => {
  return (
    <Switch>
      <Route path="/" exact component={TodoPage} />

      <PublicRoute path="/signup" component={SignUpPage} />
      <PublicRoute path="/login" component={SignInPage} />
      <PrivateRoute path="/logout" component={SignOutPage} />
      <PrivateRoute exact path="/profile" component={ProfilePage} />

      <Route
        render={() => (
          <div>
            <h1>Page Not Found</h1>
            <p>Sorry, there is nothing to see here.</p>
            <p>
              <Link to="app">Back to Home</Link>
            </p>
          </div>
        )}
      />
      <Redirect to="/" />
    </Switch>
  );
};

export default withRouter(Navigation);
