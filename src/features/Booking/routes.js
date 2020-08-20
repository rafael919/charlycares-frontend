import { isMobile } from 'react-device-detect';
import Loadable from 'react-loadable';
import Loader from 'Components/Loader';
import React from 'react';

import BookingHome from './Home/Desktop';

export const LoadableBookingCreate = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "booking-create" */ '../Booking/Create'
      );
    } else {
      return import(
        /* webpackChunkName: "booking-create-desktop" */ '../Booking/Create/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableBabysittingType = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "babysitting-type" */ '../Booking/BabysittingType'
      );
    } else {
      return import(
        /* webpackChunkName: "babysitting-type-desktop" */ '../Booking/BabysittingType'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadableBookingCancel = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "booking-cancellation" */ '../Booking/Cancellation'
      );
    } else {
      return import(
        /* webpackChunkName: "booking-cancellation-desktop" */ '../Booking/Cancellation/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableBookingHome = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "booking-home" */ './Home');
    } else {
      return import(
        /* webpackChunkName: "booking-home-desktop" */ './Home/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableEditBooking = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "booking-edit" */ './EditBooking');
    } else {
      return import(
        /* webpackChunkName: "booking-edit-desktop" */ './EditBooking/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableBookingRepeat = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "booking-repeat" */ '../Booking/Create/Repeat'
      );
    } else {
      return import(
        /* webpackChunkName: "booking-repeat-desktop" */ '../Booking/Create/Repeat/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableBookingSearch = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "booking-search" */ '../Booking/Search/'
      );
    } else {
      return import(
        /* webpackChunkName: "booking-search-desktop" */ '../Booking/Search/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableBookingFilters = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "booking-filter" */ '../Booking/Filters/'
      );
    } else {
      return import(
        /* webpackChunkName: "booking-filter-desktop" */ '../Booking/Filters/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableAngel = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "booking-angel" */ '../Angel/');
    } else {
      return import(
        /* webpackChunkName: "booking-angel-desktop" */ '../Angel/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableDetails = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "booking-details" */ '../Booking/Details'
      );
    } else {
      return import(
        /* webpackChunkName: "booking-details-desktop" */ '../Booking/Details/Desktop'
      );
    }
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableSend = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "booking-send" */ '../Booking/Send');
    } else {
      return import(
        /* webpackChunkName: "booking-send-desktop" */ '../Booking/Send/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableAccepted = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "booking-accepted" */ '../Booking/Accepted'
      );
    } else {
      return import(
        /* webpackChunkName: "booking-accepted-desktop" */ '../Booking/Accepted/Desktop'
      );
    }
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableOfferDetails = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "booking-offer-details" */ '../Booking/OfferDetails'
      );
    } else {
      return import(
        /* webpackChunkName: "booking-offer-details-desktop" */ '../Booking/OfferDetails/Desktop'
      );
    }
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableAngelOffer = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "booking-angel-offer" */ '../Booking/OfferFromAngel'
      );
    } else {
      return import(
        /* webpackChunkName: "booking-angel-offer-desktop" */ '../Booking/OfferFromAngel/Desktop'
      );
    }
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableMultiBooking = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "booking-direct-offer-desktop" */ '../Booking/MultiBooking'
    ),
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableRequestSent = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "booking-request-sent" */ '../Booking/RequestSent'
    ),
  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadableAngelBooking = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "angel-booking" */ '../Booking/AngelBooking'
      );
    } else {
      return import(
        /* webpackChunkName: "angel-booking-desktop" */ '../Booking/AngelBooking/Desktop'
      );
    }
  },

  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadableAngelBookingDecline = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "booking-angel-decline" */ '../Booking/AngelBookingDecline'
      );
    } else {
      return import(
        /* webpackChunkName: "booking-angel-decline-desktop" */ '../Booking/AngelBookingDecline/Desktop'
      );
    }
  },

  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadableAngelBookingConfirm = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "booking-confirmation" */ '../Booking/AngelBookingConfirmation'
      );
    } else {
      return import(
        /* webpackChunkName: "booking-confirmation-desktop" */ '../Booking/AngelBookingConfirmation/Desktop'
      );
    }
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const preloadAngelBookingRoutes = () => {
  LoadableAngelBooking.preload();
  LoadableAngelBookingDecline.preload();
  LoadableAngelBookingConfirm.preload();
};

const routes = rootPath => [
  {
    exact: true,
    path: `${rootPath}`,
    component: LoadableBookingHome,
  },
  {
    exact: false,
    protected: true,
    allowedRoles: ['family'],
    path: `${rootPath}/create`,
    component: LoadableBookingCreate,
  },
  {
    exact: false,
    protected: true,
    allowedRoles: ['family'],
    path: `${rootPath}/babysitting-type`,
    component: LoadableBabysittingType,
  },
  {
    exact: false,
    protected: true,
    allowedRoles: ['family'],
    path: `${rootPath}/edit/:bookingId`,
    component: LoadableEditBooking,
  },
  {
    exact: false,
    path: `${rootPath}/offer/:bookingId`,
    component: LoadableOfferDetails,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: false,
    path: `${rootPath}/accepted/:bookingId`,
    component: LoadableAccepted,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: false,
    path: `${rootPath}/angel-offer`,
    component: LoadableAngelOffer,
  },
  {
    exact: false,
    path: `${rootPath}/multibooking`,
    component: LoadableMultiBooking,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: false,
    protected: true,
    allowedRoles: ['family'],
    path: `${rootPath}/repeat/:dayId`,
    component: LoadableBookingRepeat,
  },
  {
    exact: false,
    path: `${rootPath}/search`,
    component: LoadableBookingSearch,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: false,
    path: `${rootPath}/filters`,
    component: LoadableBookingFilters,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: false,
    path: `${rootPath}/angel/:id`,
    component: LoadableAngel,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: false,
    path: `${rootPath}/details/:bookingId`,
    component: LoadableDetails,
    protected: true,
    allowedRoles: ['family', 'angel'],
  },
  {
    exact: false,
    path: `${rootPath}/send`,
    component: LoadableSend,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: false,
    path: `${rootPath}/request-send`,
    component: LoadableRequestSent,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: false,
    path: `${rootPath}/cancellation/:id`,
    component: LoadableBookingCancel,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: true,
    path: `${rootPath}/angel-booking/:bookingId`,
    component: LoadableAngelBooking,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: false,
    path: `${rootPath}/angel-booking-decline`,
    component: LoadableAngelBookingDecline,
  },
  {
    exact: false,
    path: `${rootPath}/angel-booking-confirm`,
    component: LoadableAngelBookingConfirm,
  },
];

export const desktopLeft = rootPath => [
  {
    exact: true,
    path: `${rootPath}`,
    component: BookingHome,
  },
  {
    exact: false,
    protected: true,
    allowedRoles: ['family'],
    path: `${rootPath}/create`,
    component: LoadableBookingCreate,
  },
  {
    exact: false,
    path: `${rootPath}/search`,
    component: LoadableBookingSearch,
  },
  {
    exact: false,
    protected: true,
    allowedRoles: ['family'],
    path: `${rootPath}/repeat/:dayId`,
    component: LoadableBookingRepeat,
  },
  {
    exact: false,
    path: `${rootPath}/offer/:bookingId`,
    component: LoadableOfferDetails,
  },
  {
    exact: true,
    path: `${rootPath}/angel-booking/:bookingId`,
    component: LoadableAngelBooking,
    protected: true,
    allowedRoles: ['angel'],
  },
];
export const desktopRight = [];

export default routes;
