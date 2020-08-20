import { isMobile } from 'react-device-detect';
import Loadable from 'react-loadable';
import Loader from 'Components/Loader';
import React from 'react';

export const LoadableCreatePDF = Loadable({
  loader: () =>
    import(/* webpackChunkName: "family-payments-pdf" */ './CreatePDF'),
  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadableDetails = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "family-payments-details" */ './Details');
    }
    return import(/* webpackChunkName: "family-payments-details-desktop" */ './Details/Desktop');
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableFamily = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "family-details" */ '../AngelFamilies/FamilyProfile');
    }
    return import(/* webpackChunkName: "family-details-desktop" */ '../AngelFamilies/FamilyProfile/Desktop');
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableSubscription = Loadable({
  loader: () =>
    import(/* webpackChunkName: "family-payments-subscription" */ './Subscription'),
  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadableAngelHome = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "payments-home" */ './AngelPayments');
    }
    return import(/* webpackChunkName: "payments-home-desktop" */ './AngelPayments/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadableFamilyHome = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "payments-home" */ './Home');
    }
    return import(/* webpackChunkName: "payments-home-desktop" */ './Home/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadablePaymentConfirmation = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "payments-confirmation" */ './PaymentConfirmation');
    }
    return import(/* webpackChunkName: "payments-confirmation-desktop" */ './PaymentConfirmation/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadablePaymentSuccess = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "payments-success" */ './Success');
    }
    return import(/* webpackChunkName: "payments-success-desktop" */ './Success/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableChat = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "payments-chat" */ '../Chat');
    }
    return import(/* webpackChunkName: "payments-chat-desktop" */ '../Chat/Desktop');
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

const routes = rootRoute => [
  {
    exact: true,
    path: `${rootRoute}`,
    component: LoadableFamilyHome,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: true,
    path: `${rootRoute}`,
    component: LoadableAngelHome,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/families/:familyId`,
    component: LoadableFamily,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/pdf`,
    component: LoadableCreatePDF,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: true,
    path: `${rootRoute}/confirmation`,
    component: LoadablePaymentConfirmation,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: true,
    path: `${rootRoute}/success`,
    component: LoadablePaymentSuccess,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: true,
    path: `${rootRoute}/payment/:paymentId`,
    component: LoadableDetails,
    protected: true,
    allowedRoles: ['family', 'angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/subscription`,
    component: LoadableSubscription,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: true,
    path: `${rootRoute}/angel/:id`,
    component: LoadableAngel,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: true,
    path: `${rootRoute}/chat/:userId`,
    component: LoadableChat,
    protected: true,
    allowedRoles: ['angel', 'family'],
  },
];

export default routes;
