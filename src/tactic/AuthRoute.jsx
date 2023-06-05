import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const AuthRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
