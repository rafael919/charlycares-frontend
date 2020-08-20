import { Route } from 'react-router-dom';
import React, { PureComponent } from 'react';
import routes from './routes';

export default class AngelFamilies extends PureComponent {
  render() {
    return routes(this.props.match.path).map((route, i) => {
      return (
        <Route
          key={i}
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      );
    });
  }
}
