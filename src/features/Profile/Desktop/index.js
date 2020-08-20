import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DesktopAppLayout from 'Components/DesktopAppLayout';
import Explanation from 'Components/Explanation/Custom/Profile';
import ExplanationAngel from 'Components/Explanation/Custom/ProfileAngel';

import DesktopTransitionWrapper from 'Components/DesktopTransitionWrapper';
import React, { PureComponent } from 'react';

import routes, { LoadableProfileHome, LoadableAngel, Angel, Family } from '../routes';
import { getUserRole } from '../../../data/auth/selectors';

class Profile extends PureComponent {
  render() {
    return (
      <DesktopAppLayout>
        <DesktopAppLayout.LeftColumn isWhite withScroll>
          {this.props.role === 'family' ? (
            <Route path="/profile" component={LoadableProfileHome} />
          ) : (
            <Route path="/profile" component={LoadableAngel} />
          )}
        </DesktopAppLayout.LeftColumn>
        <DesktopAppLayout.RightColumn withScroll>
          <TransitionGroup component={DesktopTransitionWrapper}>
            <CSSTransition
              classNames="fade"
              unmountOnExit
              mountOnEnter
              timeout={{ enter: 600, exit: 0 }}
              key={this.props.location.key || this.props.location.pathname}
            >
              <Switch>
                {routes(this.props.match.path)
                  .filter(route => route.path !== '/profile')
                  .reduce((routes, route, i) => {
                    if (route.allowedRoles.includes(this.props.role)) {
                      routes.push(
                        <Route
                          key={i}
                          exact
                          path={route.path}
                          component={route.component}
                        />
                      );
                    }

                    return routes;
                  }, [])}
                {this.props.role === 'family' ? (
                  <Route path="/profile/angel/:id" component={Angel} />
                ) : <Route path="/profile/family/:familyId" component={Family} />}
                {this.props.role === 'family' ? (
                  <Route component={Explanation} />
                ) : (
                  <Route component={ExplanationAngel} />
                )}
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </DesktopAppLayout.RightColumn>
      </DesktopAppLayout>
    );
  }
}

export default connect(state => ({
  role: getUserRole(state),
}))(Profile);
