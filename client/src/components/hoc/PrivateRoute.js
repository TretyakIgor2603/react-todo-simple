import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const PrivateRoute = ({ component, auth, ...rest }) => {
  let ComponentToRender = component;
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated ? (
          <ComponentToRender {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location, unauthorized: true }
            }}
          />
        )
      }
    />
  );
};

export default withRouter(connect(({ auth }) => auth)(PrivateRoute));
