import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import React, { Component } from 'react';

import routes, {
  LoadableBookingCreate,
  LoadableBookingSearch,
  LoadableBookingFilters,
  LoadableAngel,
  LoadableDetails,
  preloadAngelBookingRoutes,
} from './routes';
import { getUserRole } from '../../data/auth/selectors';

class Booking extends Component {
  componentDidMount() {
    if (this.props.role === 'family') {
      LoadableBookingCreate.preload();
      LoadableBookingSearch.preload();
      LoadableBookingFilters.preload();
      LoadableAngel.preload();
      LoadableDetails.preload();
    } else {
      preloadAngelBookingRoutes();
    }
  }

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

export default connect(state => ({
  role: getUserRole(state),
}))(Booking);
