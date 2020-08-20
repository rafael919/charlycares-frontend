import React, { Component } from 'react';

import routes from './routes';
import { Route } from 'react-router-dom';

class Joblist extends Component {
  render() {
    return routes(this.props.match.path).map((route, i) => {
      if (route.protected && route.allowedRoles.includes(this.props.role)) {
        return (
          <Route
            exact={route.exact}
            path={route.path}
            component={route.component}
            key={i}
          />
        );
      }
      if (!route.protected) {
        return (
          <Route
            exact={route.exact}
            path={route.path}
            component={route.component}
            key={i}
          />
        );
      }
    });
  }
}

export default Joblist;
