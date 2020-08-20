import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import WithRole from 'Components/WithRole';
import routes, { LoadableDetails } from './routes';

export default class Payments extends Component {
  componentDidMount() {
    LoadableDetails.preload();
  }

  render() {
    return (
      <WithRole>
        {role => {
          return routes(this.props.match.path).reduce((routesArr, route, i) => {
            if (route.protected && route.allowedRoles.includes(role)) {
              routesArr.push(
                <Route
                  key={i}
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                />
              );
              return routesArr;
            } else if (route.protected && !route.allowedRoles.includes(role)) {
              return routesArr;
            }
            routesArr.push(
              <Route
                key={i}
                exact={route.exact}
                path={route.path}
                component={route.component}
              />
            );
            return routesArr;
          }, []);
        }}
      </WithRole>
    );
  }
}
