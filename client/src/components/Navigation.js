import React from "react";
import TodoPage from "./pages/TodoPage";
import { Route, Switch, withRouter, Link, Redirect } from "react-router-dom";
import PrivateRoute from "./hoc/PrivateRoute";
import SignUpPage from "./pages/SignupPage";
import SignInPage from "./pages/SignInPage";
import SignOutPage from "./pages/SignOutPage";
import ProfilePage from "./pages/ProfilePage";

const Navigation = () => {
  return (
    <Switch>
      <Route path="/" exact component={TodoPage} />

      <PrivateRoute isGuest={true} path="/signup" component={SignUpPage} />
      <PrivateRoute isGuest={true} path="/login" component={SignInPage} />

      <PrivateRoute isLogged={true} path="/logout" component={SignOutPage} />
      <PrivateRoute
        isLogged={true}
        exact
        path="/profile"
        component={ProfilePage}
      />

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
