// @flow
import 'moment/locale/nl';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { IntlProvider, addLocaleData } from 'react-intl';
import { isMobile } from 'react-device-detect';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as Sentry from '@sentry/browser';
import DesktopError from 'Components/DesktopError';
import DesktopTimer from 'Components/DesktopTimer';

import Error from 'Components/Error';
import moment from 'moment';
import React, { Component } from 'react';
import ScrollToTop from 'Components/ScrollToTop';
import SplashScreen from 'Components/SplashScreen';
import LogRocket from 'logrocket';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import BasicButton from 'Components/Buttons/Basic';
import { FormattedMessage } from 'react-intl';

import {
  onGetIndicators,
  onAppUpdateClear,
  onGetIndicatorsSuccess,
  setUserStatus,
} from '../../ui/actions';
import {
  getUpdateStatus,
  getIndicators,
  getUserStatus,
} from '../../ui/selectors';

import {
  getAuthStatus,
  getUserRole,
  getToken,
  getAcceptedStatus,
  getMembershipStatus,
  getCanceledMembershipStatus,
  getAppointmentStatus,
  getDismissedStatus,
  getRetiredStatus,
} from '../../data/auth/selectors';
import { getUser } from '../../data/user/selectors';
import API from '../../data/user/api';
import UiAPI from '../../ui/api';
import defaultTheme from '../../themes/default';
import Routes from './routes';
import socket from '../../socket';

// $FlowFixMe
import axios from '../../axios';

// $FlowFixMe

type State = {
  locale: string,
  translations: Object,
};

type Props = {
  isAuthenticated: boolean,
  userRole: string,
};

const closeRoutes = ['/calendar/unavailable', '/calendar'];

const isOnIOS =
  navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPod/i);
const eventName = isOnIOS ? 'pagehide' : 'beforeunload';

const getLocale = () => {
  const allowed = ['nl', 'en'];
  const defaultLocale =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    'nl';

  if (allowed.includes(defaultLocale)) {
    return defaultLocale;
  } else if (defaultLocale === 'nl-NL') {
    return 'nl';
  } else {
    return 'en';
  }
};

function registerPushToken(platform, pushToken) {
  axios
    .post('/push_token', { pushToken, platform })
    .then(res => {
      if (typeof window.Android !== 'undefined') {
        window.Android.isSuccesFullyRegistered();
      }
    })
    .catch(err => console.log(err));
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Text = styled.p``;

export const AppContext = React.createContext({
  setLocale: () => {},
});

class App extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.indicatorsInterval = 30000;
    this.appReloadInterval = 60000 * 15;
    //
    window.registerPushToken = registerPushToken;

    this.state = {
      locale: getLocale(),
      translations: {},
      hasMembership: false,
      hasAppointment: null,
      isAccepted: null,
      isLoading: false,
      error: null,
      toOutside: false,
      indicatorsFlag: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return { error: true };
  }

  componentDidCatch(error, errorInfo) {
    if (
      process.env.NODE_ENV === 'production' &&
      process.env.REACT_APP_STAGE !== 'testing'
    ) {
      Sentry.withScope(scope => {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key]);
        });
        Sentry.captureException(error);
      });
    }
  }

  componentDidMount() {
    if (
      process.env.NODE_ENV === 'production' &&
      process.env.REACT_APP_STAGE !== 'testing'
    ) {
      LogRocket.init('iayxic/charlycares');
      if (this.props.user) {
        LogRocket.identify(this.props.user.user_id, {
          name: this.props.user.first_name,
          email: this.props.user.email,
          role: this.props.userRole,
          release: process.env.REACT_APP_VERSION,
        });
        Sentry.configureScope(scope => {
          scope.setUser({ email: this.props.user.email });
        });
      }
    }

    if(process.env.MAINTENANCE_MODE === true) {
      window.location = "https://www.charlycares.com/under-construction";
    }

    if (this.props.isAuthenticated) {
      this.appReload = setInterval(() => {
        window.location.reload();
      }, this.appReloadInterval);
      this.props.onGetIndicators();
      this.interval = setInterval(() => {
        this.props.onGetIndicators();
      }, this.indicatorsInterval);
      this.socketCheck();
      this.setState({ isLoading: true }, () => {
        API.getProfile()
          .then(({ data }) => {
            this.setState(
              state => {
                return {
                  ...state,
                  hasMembership: data.data.has_membership,
                  isActiveArea: data.data.is_active_area,
                  newAnnouncement: data.data.announcement,
                  hasDownloadedApp: data.data.has_app,
                  hasCanceledMembership: data.data.has_canceled_membership,
                  hasPendingBookings: data.data.has_pending_bookings,
                  hasPendingPaymentBooking:
                    data.data.has_pending_payment_booking,
                  hasOutstandingPayments: data.data.has_outstanding_payments,
                  hasExpiredCard: data.data.has_expired_card,
                  paymentLink: data.data.payment_link,
                  hasAppointment:
                    data.data.role === 'angel'
                      ? data.data.angel.angel_appointment
                      : null,
                  isSuspended:
                    data.data.role === 'angel'
                      ? data.data.angel.suspended
                      : null,
                  isAccepted: data.data.is_accepted,
                  isDismissed:
                    data.data.role === 'angel'
                      ? data.data.angel.dismissed
                      : null,
                  isRetired:
                      data.data.role === 'angel'
                        ? data.data.angel.retired
                        : null,
                  isLoading: false,

                  hasActiveTimer: data.data.has_active_timer,
                  locale: data.data.locale === 'nl_NL' ? 'nl' : 'en',
                };
              },
              () => {
                try {
                  let parameters = {
                    isLoggedIn: true,
                    sessionToken: data.data.token,
                  };
                  window.webkit.messageHandlers.iOS.postMessage(parameters);
                } catch (err) {
                  if (typeof window.Android !== 'undefined') {
                    window.Android.isLoggedIn(data.data.token);
                  }
                }
                this.setLocale(this.state.locale);
                if (
                  this.props.userRole === 'angel' &&
                  this.state.isAccepted === false && !this.state.isDismissed
                ) {
                  if (this.state.hasAppointment) {
                    this.setState({ toAppointment: true });
                  } else {
                    this.setState({ toMakeAppointment: true });
                  }
                }
                if (
                  typeof this.state.toOutside === 'boolean' &&
                  this.state.isActiveArea === false
                ) {
                  this.setState({ toOutside: true });
                }
                if (this.state.isDismissed) {
                  this.setState({ toDismissed: true });
                }
                if (this.state.isRetired) {
                  this.setState({ toRetired: true });
                }
                if (this.state.newAnnouncement) {
                  this.setState({ toAnnouncement: true });
                }

                if (
                  this.state.hasCanceledMembership === true &&
                  window.location.pathname !== '/verification/success' &&
                  !this.state.hasPendingPaymentBooking
                ) {
                  this.redirectToPath('/reactivate');
                } else if (
                  this.state.hasCanceledMembership === true &&
                  window.location.pathname !== '/verification/success' &&
                  this.state.hasPendingPaymentBooking
                ) {
                  this.redirectToPath('/reactivate/step-2');
                } else if (
                  this.state.hasMembership === false &&
                  window.location.pathname !== '/verification/success'
                ) {
                  this.redirectToPath('/welcome-back');
                } else if (
                  this.state.hasOutstandingPayments === true &&
                  !window.location.pathname.includes('/db-payments/')
                ) {
                  this.redirectToPath('/payments');
                } else if (
                  data.data.role === 'family' &&
                  this.state.hasActiveTimer &&
                  isMobile
                ) {
                  this.redirectToPath('/favorites');
                } else if (this.state.hasExpiredCard) {
                  this.redirectToPath('/expired-card');
                } else if (
                  data.data.role === 'angel' &&
                  this.state.hasPendingBookings &&
                  !isMobile
                ) {
                  this.redirectToPath('/booking');
                } else if (this.state.isSuspended) {
                  this.redirectToPath('/suspended');
                }
              }
            );
          })
          .catch(error => {
            this.setState({ error });
          });
      });
    } else {
      this.setLocale(this.state.locale);
    }

    window.addEventListener(eventName, this.checkUser);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.appReload);
    window.removeEventListener(eventName, this.checkUser);
  }

  socketCheck = () => {
    const { user } = this.props;
    if (socket.disconnected) {
      socket.connect();
    } else {
      user && user.user_id && socket.emit('CHECK_USER_STATUS', user.user_id, 1);
      socket.on('CHAT_SEND', (message, id, booking) => {
        this.updateMessages(message, id, booking);
      });
      socket.on('CHECK_USER_STATUS', (user_id, status) => {
        this.checkUserStatus(user_id, status);
      });
    }
  };

  updateMessages = (message, id, booking) => {
    this.setState(prev => {
      const { user, indicators, onGetIndicatorsSuccess } = this.props;
      if (
        Number(user.user_id) === message.receiver_id &&
        booking &&
        prev.indicatorsFlag !== message.id
      ) {
        if (!window.location.pathname.includes(`/chat/${message.user.id}`)) {
          const data = {
            new_messages: indicators.newMessages + 1,
            has_pending_bookings: indicators.pendingBookings,
            active_timer: indicators.activeTimer,
            has_pending_jobs: indicators.pendingJobs,
          };
          onGetIndicatorsSuccess(data);
        } else {
          const data = {
            message_id: message.id,
          };
          UiAPI.setRead(data);
          socket.emit(
            'INIT_CHAT_CONVERSATION',
            message.id,
            message.receiver_id
          );
        }
      }

      return {
        indicatorsFlag: message.id,
      };
    });
  };

  checkUserStatus = (user_id, status) => {
    let userStatus = [];
    if (!this.props.userStatus.find(user => user.user_id === user_id)) {
      userStatus = [...this.props.userStatus, { user_id, status }];
    } else {
      userStatus = [...this.props.userStatus].map(user => ({
        ...user,
        status: user.user_id === user_id ? status : user.status,
      }));
    }
    this.props.setUserStatus(userStatus);
  };

  checkUser = () => {
    const { user } = this.props;
    user && user.user_id && socket.emit('CHECK_USER_STATUS', user.user_id, -1);
  };

  redirectToPath = pathname => {
    if (window.location.pathname !== pathname) {
      window.location = pathname;
    }
  };

  setLocale = (locale: string = 'nl', update) => {
    let intl;
    let translation;
    if (locale === 'en') {
      intl = import(
        /*webpackChunkName: "intl-en"*/ /* webpackMode: "eager" */ `react-intl/locale-data/en`
      );
      translation = import(
        /*webpackChunkName: "translations-en"*/ /* webpackMode: "eager" */ `../../translations/en.json`
      );
    } else {
      intl = import(
        /*webpackChunkName: "intl-nl"*/ /* webpackMode: "eager" */ `react-intl/locale-data/nl`
      );
      translation = import(
        /*webpackChunkName: "translations-nl"*/ /* webpackMode: "eager" */ `../../translations/nl.json`
      );
    }
    Promise.all([translation, intl]).then(res => {
      addLocaleData([...res[1]]);
      moment.locale(this.state.locale);
      this.setState(
        {
          translations: res[0],
          locale,
        },
        () => {
          if (update) {
            API.updateLocale({
              locale: locale === 'en' ? 'en_GB' : 'nl_NL',
            })
              .then(res => {
                console.log(res);
              })
              .catch(err => console.log(err));
          }
        }
      );
    });
  };

  onErrorConfirm = () => {
    this.setState({ error: null });
  };

  onRefresh = () => {
    this.props.onAppUpdateClear();
    window.location.reload();
  };

  render() {
    if (!Object.keys(this.state.translations).length || this.state.isLoading) {
      return <SplashScreen />;
    }

    return (
      <IntlProvider
        messages={this.state.translations}
        locale={this.state.locale}
      >
        <BrowserRouter>
          <ScrollToTop>
            {this.state.toAppointment ? (
              <Redirect to="/appointment-finish" />
            ) : null}
            {this.state.toMakeAppointment ? (
              <Redirect to="/appointments" />
            ) : null}
            {this.state.toOutside === true ? (
              <Redirect to="/outside-service" />
            ) : null}
            {this.state.toAnnouncement === true ? (
              <Redirect to="/announcement" />
            ) : null}
            {this.state.toDismissed === true ? (
              <Redirect to="/dismissed" />
            ) : null}
            {this.state.toRetired === true ? (
              <Redirect to="/retired" />
            ) : null}
            {isMobile ? (
              <Error
                errors={this.state.error}
                onErrorConfirm={this.onErrorConfirm}
              />
            ) : (
              <DesktopError
                errors={this.state.error}
                onErrorConfirm={this.onErrorConfirm}
              />
            )}
            <Modal open={this.props.isAppUpdated}>
              <Modal.Content>
                <ModalContainer>
                  <Text>
                    <FormattedMessage id="appUpdate" />
                  </Text>
                  <BasicButton onClick={this.onRefresh} primary>
                    <FormattedMessage id="appUpdateRefresh" />
                  </BasicButton>
                </ModalContainer>
              </Modal.Content>
            </Modal>
            <AppContext.Provider
              value={{ setLocale: this.setLocale, locale: this.state.locale }}
            >
              {isMobile ? (
                <Route
                  exact
                  render={({ location }) => (
                    <ThemeProvider theme={defaultTheme}>
                      <TransitionGroup
                        childFactory={child => {
                          if (closeRoutes.includes(location.pathname)) {
                            return React.cloneElement(child, {
                              classNames: 'close',
                            });
                          }
                          return child;
                        }}
                        component={null}
                      >
                        <CSSTransition
                          classNames="fade"
                          unmountOnExit
                          mountOnEnter
                          timeout={{ enter: 200, exit: 0 }}
                          key={location.key || location.pathname}
                        >
                          <Routes
                            userRole={this.props.userRole}
                            token={this.props.token}
                            isAuthenticated={this.props.isAuthenticated}
                            location={location}
                            paymentLink={
                              this.state.paymentLink
                                ? this.state.paymentLink
                                : null
                            }
                            hasAppointment={
                              this.state.hasAppointment
                                ? this.state.hasAppointment
                                : this.props.hasAppointment
                            }
                            isAccepted={
                              this.state.isAccepted
                                ? this.state.isAccepted
                                : this.props.isAccepted
                            }
                            isRetired={
                              this.state.isRetired
                                ? this.state.isRetired
                                : this.props.isRetired
                            }
                            isDismissed={
                              this.state.isDismissed
                                ? this.state.isDismissed
                                : this.props.isDismissed
                            }
                            hasMembership={
                              this.state.hasMembership
                                ? this.state.hasMembership
                                : this.props.hasMembership
                            }
                            hasCanceledMembership={
                              this.state.hasCanceledMembership
                                ? this.state.hasCanceledMembership
                                : this.props.hasCanceledMembership
                            }
                          />
                        </CSSTransition>
                      </TransitionGroup>
                    </ThemeProvider>
                  )}
                />
              ) : (
                <ThemeProvider theme={defaultTheme}>
                  <React.Fragment>
                    <Routes
                      userRole={this.props.userRole}
                      token={this.props.token}
                      isAuthenticated={this.props.isAuthenticated}
                      paymentLink={
                        this.state.paymentLink ? this.state.paymentLink : null
                      }
                      hasAppointment={
                        this.state.hasAppointment
                          ? this.state.hasAppointment
                          : this.props.hasAppointment
                      }
                      isAccepted={
                        this.state.isAccepted
                          ? this.state.isAccepted
                          : this.props.isAccepted
                      }
                      hasMembership={
                        this.state.hasMembership
                          ? this.state.hasMembership
                          : this.props.hasMembership
                      }                            
                      isRetired={
                        this.state.isRetired
                          ? this.state.isRetired
                          : this.props.isRetired
                      }
                      isDismissed={
                        this.state.isDismissed
                          ? this.state.isDismissed
                          : this.props.isDismissed
                      }
                      hasCanceledMembership={
                        this.state.hasCanceledMembership
                          ? this.state.hasCanceledMembership
                          : this.props.hasCanceledMembership
                      }
                    />
                    {this.props.token ? (
                      <DesktopTimer role={this.props.userRole} />
                    ) : null}
                  </React.Fragment>
                </ThemeProvider>
              )}
            </AppContext.Provider>
          </ScrollToTop>
        </BrowserRouter>
      </IntlProvider>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: getAuthStatus(state),
  userRole: getUserRole(state),
  isAccepted: getAcceptedStatus(state),
  token: getToken(state),
  user: getUser(state),
  isAppUpdated: getUpdateStatus(state),
  isDismissed: getDismissedStatus(state),
  isRetired: getRetiredStatus(state),
  hasMembership: getMembershipStatus(state),
  hasCanceledMembership: getCanceledMembershipStatus(state),
  hasAppointment: getAppointmentStatus(state),
  indicators: getIndicators(state),
  userStatus: getUserStatus(state),
});

export default hot(module)(
  connect(
    mapStateToProps,
    { onGetIndicators, onAppUpdateClear, onGetIndicatorsSuccess, setUserStatus}
  )(App)
);
