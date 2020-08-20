import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import React, { PureComponent } from 'react';
import WithRole from 'Components/WithRole';

import routes, {
  LoadableAdd,
  LoadableAngelWeek,
  LoadableAvailabilityDetail,
} from './routes';
import { getUserRole } from '../../data/auth/selectors';

class Calendar extends PureComponent {
  componentDidMount() {
    if (this.props.role === 'angel') {
      LoadableAdd.preload();
      LoadableAngelWeek.preload();
    } else {
      LoadableAvailabilityDetail.preload();
    }
  }

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

export default connect(state => ({
  role: getUserRole(state),
}))(Calendar);
