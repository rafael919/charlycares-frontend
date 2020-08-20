import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  authenticated,
  hasMembership,
  hasAppointment,
  isAccepted,
  allowedRoles = '',
  role,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (
        role === 'angel' &&
        isAccepted === 0 &&
        hasAppointment &&
        authenticated
      ) {
        return (
          <Redirect
            exact
            to={{
              pathname: '/appointment-finish',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }
      if (role === 'angel' && authenticated && isAccepted === 0 && !props.location.pathname === '/appointments') {
        return (
          <Redirect
            exact
            to={{ pathname: '/appointments', state: { from: props.location } }}
          />
        );
      }

      if (
        authenticated === true &&
        role &&
        role !== '' &&
        allowedRoles.includes(role)
      ) {
        return <Component {...props} />;
      }
      return (
        <Redirect
          exact
          to={{ pathname: '/', state: { from: props.location } }}
        />
      );
    }}
  />
);

export default ProtectedRoute;
