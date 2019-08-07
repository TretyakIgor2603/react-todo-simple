import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const PrivateRoute = ({
  isGuest = false,
  isLogged = false,
  component,
  auth,
  ...rest
}) => {
  let ComponentToRender = component;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          (isLogged && auth.isAuthenticated) ||
          (isGuest && !auth.isAuthenticated)
        ) {
          return <ComponentToRender {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: isLogged ? "/login" : "/",
                unauthorized: isLogged ? true : false,
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

export default withRouter(connect((auth) => auth)(PrivateRoute));
