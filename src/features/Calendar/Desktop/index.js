import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import DesktopAppLayout from 'Components/DesktopAppLayout';
import AgendaLegenda from '../../Support/components/AgendaLegenda';
import AgendaLegendaFamily from '../../Support/components/AgendaLegendaFamily';
import React, { Component } from 'react';

import routes, {
  LoadableAdd,
  LoadableAngelWeek,
  LoadableAvailabilityDetail,
  LoadableAvailability,
} from '../routes';
import { getUserRole } from '../../../data/auth/selectors';

class Calendar extends Component {
  componentDidMount() {
    if (this.props.role === 'angel') {
      LoadableAdd.preload();
      LoadableAngelWeek.preload();
    } else {
      LoadableAvailabilityDetail.preload();
    }
  }

  isColumnWhite = () => {
    if (
      this.props.location.pathname.includes('/calendar') ||
      this.props.location.pathname.includes('/calendar/add') ||
      this.props.location.pathname.includes('/calendar/not-available') ||
      this.props.location.pathname.includes('/calendar/fixed-sitting')
    ) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <DesktopAppLayout>
        <DesktopAppLayout.LeftColumn withScroll noPaddingBottom isWhite={this.isColumnWhite()}>
          {this.props.role === 'angel' ? (
            <Switch>
              <Route path="/calendar/add" component={LoadableAvailability} />
              <Route
                path="/calendar/not-available"
                component={LoadableAvailability}
              />
              <Route 
                path="/calendar/fixed-sitting" 
                component={LoadableAvailability} 
              />
              <Route component={LoadableAvailability} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/calendar" component={LoadableAvailability} />
              <Route
                path="/calendar/availability/:id"
                component={LoadableAvailability}
              />
              <Route path="/calendar/:id" component={LoadableAvailability} />
              <Route
                path="/calendar/bookings/:id"
                component={LoadableAvailability}
              />
            </Switch>
          )}
        </DesktopAppLayout.LeftColumn>
        <DesktopAppLayout.RightColumn id="scrollDiv" withScroll>
          <Switch>
            {routes(this.props.match.path).reduce((routes, route, i) => {
              if (this.props.role === 'angel' && route.path === '/calendar')
                return routes;
              if (
                route.path === '/calendar' ||
                route.path === '/calendar/:id' ||
                route.path === '/calendar/availability/:id' ||
                route.path === '/calendar/bookings/:id'
              ) {
                return routes;
              }
              if (
                route.protected &&
                route.allowedRoles.includes(this.props.role)
              ) {
                routes.push(
                  <Route
                    key={i}
                    path={route.path}
                    component={route.component}
                  />
                );
                return routes;
              }
              return routes;
            }, [])}
            <Route path="/calendar/add" component={LoadableAngelWeek} />
            {this.props.role === 'angel' ? (
              <Route component={AgendaLegenda} />
            ) : (
              <Route component={AgendaLegendaFamily} />
            )}
          </Switch>
        </DesktopAppLayout.RightColumn>
      </DesktopAppLayout>
    );
  }
}

export default connect(state => ({
  role: getUserRole(state),
}))(Calendar);
