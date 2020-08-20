import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import WithRole from 'Components/WithRole';

import routes from './routes';

export default class Shops extends Component {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

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
