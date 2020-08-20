import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import BookingExplanation from 'Components/Explanation/Custom/Booking';
import BookingExplanationAngel from 'Components/Explanation/Custom/BookingAngel';
import BookingExplanationCreate from 'Components/Explanation/Custom/BookingCreate';
import DesktopAppLayout from 'Components/DesktopAppLayout';
import React, { PureComponent } from 'react';

import { onUpdateUserProfileData } from '../../../data/user/actions';
import Chat from '../../Chat/Desktop';
import FamilyProfile from '../../AngelFamilies/FamilyProfile/Desktop';

import routes, {
  LoadableAngelBookingDecline,
  LoadableBookingCreate,
  LoadableBookingSearch,
  LoadableBookingFilters,
  LoadableAngel,
  LoadableAngelOffer,
  LoadableDetails,
  preloadAngelBookingRoutes,
  LoadableBookingHome,
  LoadableSend,
  LoadableAngelBookingConfirm,
} from '../routes';
import Calendar from '../../Calendar/Availability/Desktop';
import { getUserRole } from '../../../data/auth/selectors';

class Booking extends PureComponent {
  componentDidMount() {
    if (this.props.role === 'family') {
      LoadableBookingCreate.preload();
      LoadableBookingSearch.preload();
      LoadableBookingFilters.preload();
      LoadableAngel.preload();
      LoadableDetails.preload();
    } else {
      preloadAngelBookingRoutes();
      this.props.onUpdateUserProfileData();
    }
  }

  isColumnWhite = () => {
    if (
      this.props.location.pathname.includes('/booking/create') ||
      this.props.location.pathname.includes('/booking/send') ||
      this.props.location.pathname.includes('/booking/repeat')
    ) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <DesktopAppLayout>
        <DesktopAppLayout.LeftColumn withScroll isWhite={this.isColumnWhite()}>
          <Switch>
            <Route path="/booking/search" component={LoadableBookingSearch} />
            <Route path="/booking/create" component={LoadableBookingCreate} />
            <Route
              path="/booking/repeat/:dayId"
              component={LoadableBookingCreate}
            />
            <Route exact path="/booking/send" component={LoadableSend} />
            <Route component={LoadableBookingHome} />
          </Switch>
        </DesktopAppLayout.LeftColumn>
        <DesktopAppLayout.RightColumn withScroll id="rightColumn">
          <TransitionGroup component={null}>
            <CSSTransition
              classNames="fade"
              unmountOnExit
              mountOnEnter
              timeout={{ enter: 600, exit: 0 }}
              key={this.props.location.key || this.props.location.pathname}
            >
              <Switch location={this.props.location}>
                <Route
                  exact
                  path="/booking/angel-booking/calendar"
                  component={Calendar}
                />
                {routes(this.props.match.path).reduce((r, route, i) => {
                  if (
                    route.path === '/booking' ||
                    route.path === '/booking/create' ||
                    route.path === '/booking/search' ||
                    route.path === '/booking/send'
                  ) {
                    return r;
                  }
                  if (
                    route.protected &&
                    route.allowedRoles.includes(this.props.role)
                  ) {
                    r.push(
                      <Route
                        exact={route.exact}
                        path={route.path}
                        component={route.component}
                        key={i}
                      />
                    );
                  }

                  return r;
                }, [])}

                <Route path="/booking/chat/:userId" component={Chat} />
                <Route path="/booking/search/chat/:userId" component={Chat} />
                <Route path="/booking/availability/:id" component={Calendar} />
                <Route path="/booking/search/availability/:id" component={Calendar} />

                <Route
                  path="/booking/angel-booking/families/:familyId"
                  component={FamilyProfile}
                />
                <Route
                  path="/booking/angel-booking/chat/:userId"
                  component={Chat}
                />
                <Route
                  path="/booking/angel-offer"
                  component={LoadableAngelOffer}
                />
                <Route
                  path="/booking/angel-booking-confirm"
                  component={LoadableAngelBookingConfirm}
                />
                <Route
                  path="/booking/angel-booking-decline"
                  component={LoadableAngelBookingDecline}
                />
                <Route path="/booking/chat/:userId" component={Chat} />
                <Route
                  path="/booking/angel-booking/families/:familyId"
                  component={FamilyProfile}
                />
                <Route
                  path="/booking/angel-booking/chat/:userId"
                  component={Chat}
                />
                <Route
                  path="/booking/search/angel/:id"
                  component={LoadableAngel}
                />
                <Route
                  path="/booking/create/show-calendar"
                  component={Calendar}
                />
                {this.props.role === 'family' ? (
                  this.props.location.pathname === '/booking' ? (
                    <Route component={BookingExplanation} />
                  ) : (
                    <Route component={BookingExplanationCreate} />
                  )
                ) : (
                  <Route component={BookingExplanationAngel} />
                )}
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </DesktopAppLayout.RightColumn>
      </DesktopAppLayout>
    );
  }
}

export default connect(
  state => ({
    role: getUserRole(state),
  }),
  { onUpdateUserProfileData }
)(Booking);
