import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const PrivateRoute = ({
  isGuest = false,
  isLogged = false,
  withRole,
  component,
  isAuthorized,
  user,
  roles,
  ...rest
}) => {
  const ComponentToRender = component;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.role && roles && roles.indexOf(user.role === -1)) {
          // role not authorised so redirect to home page
          return <Redirect to={{ pathname: '/'}} />
        }

        if ((isLogged && isAuthorized) || (isGuest && !isAuthorized)) {
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

export default withRouter(connect(({ account }) => account)(PrivateRoute));
