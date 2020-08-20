import { isMobile } from 'react-device-detect';
import Loadable from 'react-loadable';
import Loader from 'Components/Loader';
import React from 'react';

import Availability from './Availability';

export const LoadableAdd = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "calendar-add" */ './CalendarAdd');
    }

    return import(
      /* webpackChunkName: "calendar-add-desktop" */ './CalendarAdd/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableFixedSitting = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "calendar-fixed-sitting" */ './FixedSitting'
      );
    }

    return import(
      /* webpackChunkName: "calendar-fixed-sitting-desktop" */ './FixedSitting/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableNotAvailable = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "calendar-not-available" */ './NotAvailable'
      );
    }

    return import(
      /* webpackChunkName: "calendar-not-available-desktop" */ './NotAvailable/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableUnavailable = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "calendar-unavailable" */ './Unavailable'
      );
    }

    return import(
      /* webpackChunkName: "calendar-unavailable-desktop" */ './Unavailable/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableAvailabilityDetail = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "calendar-availability-detail" */ './AvailabilityDetail'
      );
    }

    return import(
      /* webpackChunkName: "calendar-availability-detail-desktop" */ './AvailabilityDetail/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableAngelWeek = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "calendar-angel-week" */ './AngelWeek'
      );
    }

    return import(
      /* webpackChunkName: "calendar-angel-week-desktop" */ './AngelWeek/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableAvailability = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "calendar-availability" */ './Availability'
      );
    }

    return import(
      /* webpackChunkName: "calendar-availability-desktop" */ './Availability/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableCalendarDetails = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "calendar-booking-details" */ '../Booking/AngelBooking'
      );
    }

    return import(
      /* webpackChunkName: "calendar-booking-details-desktop" */ '../Booking/AngelBooking/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableCalendarSupport = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "calendar-support" */ '../Support');
    }

    return import(
      /* webpackChunkName: "calendar-support-desktop" */ '../Support/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableUnavailableRepeat = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "calendar-not-available-repeat" */ '../Calendar/NotAvailable/components/Repeat'
      );
    }

    return import(
      /* webpackChunkName: "calendar-not-available-repeat-desktop" */ '../Calendar/NotAvailable/components/Repeat/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableFixedSitter = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "fixed-sitter" */ '../Calendar/FixedSitter'
      );
    } else {
      return import(
        /* webpackChunkName: "fixed-sitter-desktop" */ '../Calendar/FixedSitter/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableUpToDate = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "fixed-sitter" */ '../Calendar/UpToDate'
      );
    } else {
      return import(
        /* webpackChunkName: "fixed-sitter-desktop" */ '../Calendar/UpToDate/Desktop'
      );
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const routes = rootPath => [
  {
    exact: true,
    path: `${rootPath}/add`,
    component: LoadableAdd,
  },
  {
    exact: true,
    path: `${rootPath}/availability/:id`,
    component: LoadableAvailability,
  },
  {
    exact: true,
    path: `${rootPath}`,
    component: LoadableAvailability,
    protected: true,
    allowedRoles: ['angel', 'family'],
  },
  {
    exact: true,
    path: `${rootPath}/bookings/:id`,
    component: Availability,
  },
  {
    exact: true,
    path: `${rootPath}/angel-booking/:bookingId`,
    component: LoadableCalendarDetails,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootPath}/support`,
    component: LoadableCalendarSupport,
  },
  {
    exact: true,
    path: `${rootPath}/availability/:id/support`,
    component: LoadableCalendarSupport,
  },
  {
    exact: true,
    path: `${rootPath}/availability-detail`,
    component: LoadableAvailabilityDetail,
  },
  {
    exact: true,
    path: `${rootPath}/availability/:id/availability-detail`,
    component: LoadableAvailabilityDetail,
  },
  {
    exact: true,
    path: `${rootPath}/fixed-sitting`,
    component: LoadableFixedSitting,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootPath}/not-available`,
    component: LoadableNotAvailable,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootPath}/not-available/repeat`,
    component: LoadableUnavailableRepeat,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootPath}/unavailable`,
    component: LoadableUnavailable,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootPath}/week`,
    component: LoadableAngelWeek,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootPath}/fixed-sitter`,
    component: LoadableFixedSitter,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootPath}/up-to-date`,
    component: LoadableUpToDate,
    protected: true,
    allowedRoles: ['angel'],
  },
];

export default routes;
