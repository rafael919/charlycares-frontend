import { Route } from 'react-router-dom';
import React, { PureComponent } from 'react';
import WithRole from 'Components/WithRole';
import routes from './routes';

export default class Profile extends PureComponent {
  render() {
    return (
      <WithRole>
        {role =>
          routes(this.props.match.path).map((route, i) => {
            if (route.protected && route.allowedRoles.includes(role)) {
              return (
                <Route
                  key={i}
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                />
              );
            }
            if (!route.protected) {
              return (
                <Route
                  key={i}
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                />
              );
            }
          })
        }
      </WithRole>
    );
  }
}
