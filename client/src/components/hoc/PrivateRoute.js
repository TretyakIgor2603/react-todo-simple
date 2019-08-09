import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const PrivateRoute = ({
  isGuest = false,
  isLogged = false,
  component,
  account,
  ...rest
}) => {
  let ComponentToRender = component;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          (isLogged && account.isAuthorized) ||
          (isGuest && !account.isAuthorized)
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

export default withRouter(connect((account) => account)(PrivateRoute));
