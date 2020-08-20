import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DesktopAppLayout from 'Components/DesktopAppLayout';
import Explanation from 'Components/Explanation/Custom/Families';
import React, { Component } from 'react';

import Chat from '../../Chat/Desktop';
import FamilyProfile from '../FamilyProfile/Desktop';
import Repeat from '../../Booking/Create/Repeat/Desktop';
import Book from '../../Booking/Create/Desktop';
import routes, { LoadableFamilies } from '../routes';

export default class AngelFamilies extends Component {
  isColumnWhite = () => {
    if (this.props.location.pathname.includes('/families/')) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <DesktopAppLayout>
        <DesktopAppLayout.LeftColumn withScroll>
          <Route path="/families" component={LoadableFamilies} />
        </DesktopAppLayout.LeftColumn>
        <DesktopAppLayout.RightColumn
          withScroll
          overflow={this.props.location.pathname.includes('/chat/')}
        >
          <TransitionGroup component={null}>
            <CSSTransition
              classNames="fade"
              unmountOnExit
              mountOnEnter
              timeout={{ enter: 300, exit: 0 }}
              key={this.props.location.key || this.props.location.pathname}
            >
              <Switch>
                {routes(this.props.match.path)
                  .filter(route => route.path !== '/families')
                  .map((route, i) => {
                    if (
                      route.protected &&
                      route.allowedRoles.includes(this.props.role)
                    ) {
                      return (
                        <Route
                          exact={route.exact}
                          path={route.path}
                          component={route.component}
                          key={i}
                        />
                      );
                    }
                    return (
                      <Route
                        exact={route.exact}
                        path={route.path}
                        component={route.component}
                        key={i}
                      />
                    );
                  })}
                <Route path="/families/chat/:userId" component={Chat} />
                <Route path="/families/repeat/:bookId" component={Repeat} />
                <Route path="/families/booking/:id" component={Book} />
                <Route path="/families/:familyId" component={FamilyProfile} />
                <Route component={Explanation} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </DesktopAppLayout.RightColumn>
      </DesktopAppLayout>
    );
  }
}
