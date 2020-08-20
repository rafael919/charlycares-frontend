import { isMobile } from 'react-device-detect';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Loadable from 'react-loadable';
import ProtectedRoute from 'Components/ProtectedRoute';
import React from 'react';

import AngelProfile from '../AngelProfile';
import Chat from '../Chat';
import Repeat from '../Booking/Create/Repeat';
import Book from '../Booking/Create';
import defaultTheme from '../../themes/default';
import Support from '../Support';
import Loader from 'Components/Loader';

const LoadableLogin = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "login" */ '../Login');
    } else {
      return import(/* webpackChunkName: "login-desktop" */ '../Login/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadableCalendar = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "calendar" */ '../Calendar');
    } else {
      return import(
        /* webpackChunkName: "calendar-desktop" */ '../Calendar/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadablePayments = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "payments" */ '../Payments');
    } else {
      return import(
        /* webpackChunkName: "payments-desktop" */ '../Payments/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadableAngelFamilies = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "angel-families" */ '../AngelFamilies'
      );
    } else {
      return import(
        /* webpackChunkName: "angel-families-desktop" */ '../AngelFamilies/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadableBooking = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "booking" */ '../Booking');
    } else {
      return import(
        /* webpackChunkName: "booking-desktop" */ '../Booking/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadablePasswordRecovery = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "password-recovery" */ '../PasswordRecovery'
      );
    } else {
      return import(
        /* webpackChunkName: "password-recovery-desktop" */ '../PasswordRecovery/Desktop'
      );
    }
  },

  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadablePassword = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "new-password" */ '../NewPassword');
    } else {
      return import(
        /* webpackChunkName: "new-password-desktop" */ '../NewPassword/Desktop'
      );
    }
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableSignup = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "signup" */ '../Signup');
    } else {
      return import(
        /* webpackChunkName: "signup-desktop" */ '../Signup/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableWelcome = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "welcome" */ '../Welcome');
    } else {
      return import(
        /* webpackChunkName: "welcome-desktop" */ '../Welcome/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableWelcomeBack = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "welcomeback" */ '../WelcomeBack');
    } else {
      return import(
        /* webpackChunkName: "welcomeback-destkop" */ '../WelcomeBack/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableReactivateFirstStep = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "reactivate" */ '../Reactivate/FirstStep'
      );
    } else {
      return import(
        /* webpackChunkName: "reactivate-destkop" */ '../Reactivate/FirstStep/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableReactivateSecondStep = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "reactivate" */ '../Reactivate/SecondStep'
      );
    } else {
      return import(
        /* webpackChunkName: "reactivate-destkop" */ '../Reactivate/SecondStep/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableFavorites = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "favorites" */ '../Favorites');
    } else {
      return import(
        /* webpackChunkName: "favorites-desktop" */ '../Favorites/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableShops = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "shop" */ '../Shop');
    } else {
      return import(/* webpackChunkName: "shop-desktop" */ '../Shop/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableJoblist = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "joblist" */ '../Joblist');
    } else {
      return import(
        /* webpackChunkName: "joblist-desktop" */ '../Joblist/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableAngel = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "angel" */ '../Angel');
    } else {
      return import(/* webpackChunkName: "angel-desktop" */ '../Angel/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const ExpiredCard = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "expired-card" */ '../Payments/ExpiredCard'
      );
    }
    return import(
      /* webpackChunkName: "expired-card-desktop" */ '../Payments/ExpiredCard/Desktop'
    );
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableProfile = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "home-profile" */ '../Profile');
    } else {
      return import(
        /* webpackChunkName: "home-profile-desktop" */ '../Profile/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadablePaymentMethodVerification = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "payment-method-verification" */ '../PaymentMethodVerification'
      );
    }
    return import(
      /* webpackChunkName: "payment-method-verification-desktop" */ '../PaymentMethodVerification/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableAngelReference = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "angel-reference" */ '../AngelReference'
      );
    }
    return import(
      /* webpackChunkName: "angel-reference-desktop" */ '../AngelReference/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableSignupNoMembership = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "signup-no-membership" */ '../Signup/NoValidMembership'
      );
    }
    return import(
      /* webpackChunkName: "signup-no-membership-desktop" */ '../Signup/NoValidMembership/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableSuspended = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "suspend" */ '../Suspended');
    }
    return import(
      /* webpackChunkName: "suspend-desktop" */ '../Suspended/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableHowItWorks = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "how-it-works-" */ '../Signup/HowItWorks'
      );
    }
    return import(
      /* webpackChunkName: "how-it-works--desktop" */ '../Signup/HowItWorks/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableHowItWorksTrial = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "how-it-works-trial" */ '../Signup/HowItWorksTrial'
      );
    }
    return import(
      /* webpackChunkName: "how-it-works-trial-desktop" */ '../Signup/HowItWorksTrial/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableOnboarding = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "onboarding-" */ '../Onboarding');
    }
    return import(/* webpackChunkName: "onboarding-desktop" */ '../Onboarding');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableCongrats = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "congrats" */ '../Signup/Congrats');
    }
    return import(
      /* webpackChunkName: "congrats-desktop" */ '../Signup/Congrats/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadableMembership = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "membership" */ '../Signup/Membership'
      );
    }
    return import(
      /* webpackChunkName: "membership-desktop" */ '../Signup/Membership/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadablePayment = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "signup-connect-payment" */ '../Signup/ConnectPayment'
      );
    }
    return import(
      /* webpackChunkName: "signup-connect-payment-desktop" */ '../Signup/ConnectPayment/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableSupport = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "faq" */ '../FAQ');
    } else {
      return import(/* webpackChunkName: "faq-desktop" */ '../FAQ/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadablePaymentCheck = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "payment-check" */ '../Payments/PaymentCheck'
      );
    } else {
      return import(
        /* webpackChunkName: "payment-check-desktop" */ '../Payments/PaymentCheck/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadablePaymentCheckNoResult = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "payment-check-no-result" */ '../Payments/PaymentCheckNoResult'
      );
    } else {
      return import(
        /* webpackChunkName: "payment-check-no-result-desktop" */ '../Payments/PaymentCheckNoResult/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadablePaymentFailure = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "payment-failed" */ '../Payments/PaymentFailed'
      );
    } else {
      return import(
        /* webpackChunkName: "payment-failed-desktop" */ '../Payments/PaymentFailed/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadablePaymentSuccess = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "payment-success" */ '../Payments/PaymentSuccess'
      );
    } else {
      return import(
        /* webpackChunkName: "payment-success-desktop" */ '../Payments/PaymentSuccess/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadableReferralLanding = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "referral-landing" */ '../Referral/LandingPage'
      );
    } else {
      return import(
        /* webpackChunkName: "referral-landing-desktop" */ '../Referral/LandingPage/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableReferralSend = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "referral-send" */ '../Referral/Send');
    } else {
      return import(
        /* webpackChunkName: "referral-send-desktop" */ '../Referral/Send/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadableAppointments = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "appointments" */ '../Signup/Appointments'
      );
    } else {
      return import(
        /* webpackChunkName: "appointments-desktop" */ '../Signup/Appointments/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadableAgenda = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "agenda" */ '../Signup/Agenda');
    } else {
      return import(
        /* webpackChunkName: "agenda-desktop" */ '../Signup/Agenda/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadableAppointmentConfirmation = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "appointment-confirmation" */ '../Signup/AppointmentConfirmation'
      );
    } else {
      return import(
        /* webpackChunkName: "appointment-confirmation-desktop" */ '../Signup/AppointmentConfirmation/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadableAppointmentFinish = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "appointment-finish" */ '../Signup/AppointmentFinish'
      );
    } else {
      return import(
        /* webpackChunkName: "appointment-finish-desktop" */ '../Signup/AppointmentFinish/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadableOutsideService = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "outside-service" */ '../Signup/OutsideService'
      );
    } else {
      return import(
        /* webpackChunkName: "outside-service-desktop" */ '../Signup/OutsideService/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableAnnouncement = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "announcement" */ '../Announcement');
    } else {
      return import(
        /* webpackChunkName: "announcement-desktop" */ '../Announcement/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableAngelDismissed = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "angel-dismissed" */ '../AngelDismissed'
      );
    } else {
      return import(
        /* webpackChunkName: "angel-dismissed-desktop" */ '../AngelDismissed/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableAngelRetired = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "angel-retired" */ '../AngelRetired'
      );
    } else {
      return import(
        /* webpackChunkName: "angel-retired-desktop" */ '../AngelRetired/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const Routes = ({
  location,
  isAuthenticated,
  userRole,
  token,
  paymentLink,
  hasAppointment,
  isAccepted,
  hasMembership,
  newAnnouncement,
  hasCanceledMembership,
  isDismissed,
  isRetired,
}) => {
  return (
    <Switch location={location}>
      <Route
        exact
        path="/"
        render={props => {
          return (
            <LoadableWelcome
              {...props}
              token={token}
              preloadLogin={LoadableLogin.preload}
              isAuthenticated={isAuthenticated}
            />
          );
        }}
      />
      <Route
        exact
        path="/welcome-back"
        render={props => {
          return (
            <LoadableWelcomeBack
              {...props}
              token={token}
              preloadLogin={LoadableLogin.preload}
              isAuthenticated={isAuthenticated}
            />
          );
        }}
      />
      <Route
        exact
        path="/reactivate"
        render={props => {
          return (
            <LoadableReactivateFirstStep
              {...props}
              token={token}
              preloadLogin={LoadableLogin.preload}
              isAuthenticated={isAuthenticated}
              paymentLink={paymentLink}
            />
          );
        }}
      />
      <Route
        exact
        path="/reactivate/step-2"
        render={props => {
          return (
            <LoadableReactivateSecondStep
              {...props}
              token={token}
              preloadLogin={LoadableLogin.preload}
              isAuthenticated={isAuthenticated}
              paymentLink={paymentLink}
            />
          );
        }}
      />
      <Route
        path="/login"
        render={props => (
          <ThemeProvider theme={defaultTheme}>
            <LoadableLogin
              {...props}
              token={token}
              hasMembership={hasMembership}
              hasCanceledMembership={hasCanceledMembership}
              isDismissed={isDismissed}
              isRetired={isRetired}
            />
          </ThemeProvider>
        )}
      />
      <Route path="/password-recovery/:token" component={LoadablePassword} />
      <Route path="/password-recovery" component={LoadablePasswordRecovery} />
      <Route
        path="/signup/:user"
        render={props => {
          return <LoadableSignup {...props} />;
        }}
      />
      <Route
        path="/how-it-works"
        render={props => {
          return <LoadableHowItWorks {...props} />;
        }}
      />
      <Route
        path="/how-it-works-trial"
        render={props => {
          return <LoadableHowItWorksTrial {...props} />;
        }}
      />
      <Route
        path="/onboarding"
        render={props => {
          return <LoadableOnboarding {...props} />;
        }}
      />
      <Route
        path="/congrats"
        render={props => {
          return <LoadableCongrats {...props} />;
        }}
      />
      <Route
        path="/reference/:angelId/:referenceId"
        render={props => {
          return <LoadableAngelReference {...props} />;
        }}
      />
      <Route
        path="/membership"
        render={props => {
          return <LoadableMembership {...props} />;
        }}
      />
      <Route
        path="/connect-payment"
        render={props => {
          return <LoadablePayment paymentLink={paymentLink} {...props} />;
        }}
      />
      <Route
        path="/expired-card"
        render={props => {
          return <ExpiredCard paymentLink={paymentLink} {...props} />;
        }}
      />
      <Route
        path="/no-membership"
        render={props => <LoadableSignupNoMembership {...props} />}
      />
      <Route
        path="/appointments"
        render={props => <LoadableAppointments {...props} />}
      />
      <ProtectedRoute
        allowedRoles={['angel']}
        role={userRole}
        path="/suspended"
        authenticated={isAuthenticated}
        component={LoadableSuspended}
        hasAppointment={hasAppointment}
        isAccepted={isAccepted}
      />
      <Route path="/agenda" render={props => <LoadableAgenda {...props} />} />
      <Route
        path="/appointment-confirmation"
        render={props => <LoadableAppointmentConfirmation {...props} />}
      />
      <Route
        path="/appointment-finish"
        render={props => <LoadableAppointmentFinish {...props} />}
      />
      <ProtectedRoute
        allowedRoles={['family', 'angel']}
        role={userRole}
        path="/booking"
        token={token}
        authenticated={isAuthenticated}
        component={LoadableBooking}
        hasMembership={hasMembership}
        hasAppointment={hasAppointment}
        isAccepted={isAccepted}
      />
      <ProtectedRoute
        allowedRoles={['family']}
        role={userRole}
        path="/favorites"
        authenticated={isAuthenticated}
        component={LoadableFavorites}
        hasAppointment={hasAppointment}
        isAccepted={isAccepted}
      />
      <ProtectedRoute
        allowedRoles={['angel']}
        role={userRole}
        path="/shop"
        authenticated={isAuthenticated}
        component={LoadableShops}
        hasAppointment={hasAppointment}
        isAccepted={isAccepted}
      />

      <ProtectedRoute
        allowedRoles={['angel']}
        role={userRole}
        path="/joblist"
        authenticated={isAuthenticated}
        component={LoadableJoblist}
        hasAppointment={hasAppointment}
        isAccepted={isAccepted}
      />
      <ProtectedRoute
        allowedRoles={['family', 'angel']}
        role={userRole}
        path="/chat/:userId"
        authenticated={isAuthenticated}
        component={Chat}
        hasAppointment={hasAppointment}
        isAccepted={isAccepted}
      />
      <ProtectedRoute
        allowedRoles={['family', 'angel']}
        role={userRole}
        path="/repeat/:bookId"
        authenticated={isAuthenticated}
        component={Repeat}
        hasAppointment={hasAppointment}
        isAccepted={isAccepted}
      />
      <ProtectedRoute
        allowedRoles={['family', 'angel']}
        role={userRole}
        path="/book/:id"
        authenticated={isAuthenticated}
        component={Book}
        hasAppointment={hasAppointment}
        isAccepted={isAccepted}
      />
      <ProtectedRoute
        allowedRoles={['family']}
        role={userRole}
        path="/angel-profile"
        authenticated={isAuthenticated}
        component={AngelProfile}
        isAccepted={isAccepted}
        hasAppointment={hasAppointment}
      />
      <ProtectedRoute
        allowedRoles={['angel']}
        role={userRole}
        path="/families"
        authenticated={isAuthenticated}
        component={LoadableAngelFamilies}
        hasAppointment={hasAppointment}
        isAccepted={isAccepted}
      />
      <ProtectedRoute
        allowedRoles={['family', 'angel']}
        role={userRole}
        path="/calendar"
        authenticated={isAuthenticated}
        component={LoadableCalendar}
        hasAppointment={hasAppointment}
        isAccepted={isAccepted}
      />
      <ProtectedRoute
        allowedRoles={['family', 'angel']}
        role={userRole}
        path="/payments"
        authenticated={isAuthenticated}
        component={LoadablePayments}
        hasAppointment={hasAppointment}
        isAccepted={isAccepted}
      />
      <ProtectedRoute
        allowedRoles={['family', 'angel']}
        role={userRole}
        path="/profile"
        authenticated={isAuthenticated}
        component={LoadableProfile}
        hasAppointment={hasAppointment}
        isAccepted={isAccepted}
      />
      <ProtectedRoute
        allowedRoles={['family', 'angel']}
        role={userRole}
        path="/support"
        authenticated={isAuthenticated}
        component={Support}
        hasAppointment={hasAppointment}
        isAccepted={isAccepted}
      />
      <ProtectedRoute
        allowedRoles={['family']}
        role={userRole}
        path="/angel/:id"
        authenticated={isAuthenticated}
        component={LoadableAngel}
        hasAppointment={hasAppointment}
        isAccepted={isAccepted}
      />
      <ProtectedRoute
        allowedRoles={['family', 'angel']}
        role={userRole}
        path="/faq"
        authenticated={isAuthenticated}
        token={token}
        component={LoadableSupport}
        hasAppointment={hasAppointment}
        isAccepted={isAccepted}
      />
      <ProtectedRoute
        allowedRoles={['family', 'angel']}
        role={userRole}
        path="/outside-service"
        authenticated={isAuthenticated}
        token={token}
        component={LoadableOutsideService}
        hasAppointment={hasAppointment}
        isAccepted={isAccepted}
      />
      <ProtectedRoute
        allowedRoles={['family', 'angel']}
        role={userRole}
        path="/announcement"
        authenticated={isAuthenticated}
        token={token}
        component={LoadableAnnouncement}
        hasAppointment={hasAppointment}
        isAccepted={isAccepted}
        newAnnouncement={newAnnouncement}
      />
      <ProtectedRoute
        allowedRoles={['angel']}
        role={userRole}
        path="/dismissed"
        authenticated={isAuthenticated}
        token={token}
        component={LoadableAngelDismissed}
        hasAppointment={hasAppointment}
        isAccepted={isAccepted}
        newAnnouncement={newAnnouncement}
      />
      <Route
        allowedRoles={['angel']}
        role={userRole}
        path="/retired"
        authenticated={isAuthenticated}
        token={token}
        component={LoadableAngelRetired}
        hasAppointment={hasAppointment}
        isAccepted={isAccepted}
        newAnnouncement={newAnnouncement}
        isRetired={isRetired}
      />
      <Route path="/db-payments/" component={LoadablePaymentCheck} />
      <Route path="/no-result" component={LoadablePaymentCheckNoResult} />
      <Route
        path="/db-payment/result/success"
        component={LoadablePaymentSuccess}
      />
      <Route
        path="/db-payment/result/failed/"
        component={LoadablePaymentFailure}
      />
      <Route
        path="/invite/:reference/:target"
        component={LoadableReferralLanding}
      />
      <Route path="/share/:userId" component={LoadableReferralSend} />
      <Route
        path="/verification/:status"
        render={props => {
          return <LoadablePaymentMethodVerification {...props} />;
        }}
        authenticated={isAuthenticated}
      />

      <Route
        render={() => {
          return <div> 404 </div>;
        }}
      />
    </Switch>
  );
};

export default Routes;
