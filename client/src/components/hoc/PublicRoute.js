import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const PublicRoute = ({ component:ComponentToRender, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        ) : (
          <ComponentToRender {...props} />
        )
      }
    />
  );
};

export default withRouter(connect((auth) => auth)(PublicRoute));
