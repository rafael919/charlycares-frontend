import { isMobile } from 'react-device-detect';
import Loadable from 'react-loadable';
import Loader from 'Components/Loader';
import React from 'react';

export const LoadableJoblistDetails = Loadable({
  loader: () => {
    return import(/* webpackChunkName: "joblist-details" */ './Details');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadableJoblist = Loadable({
  loader: () => {
    return import(/* webpackChunkName: "joblist-home" */ './Home');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableJoblistConfirmation = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "joblist-confirmation" */ './JoblistConfirmation');
    }
    return import(/* webpackChunkName: "joblist-confirmation-desktop" */ './JoblistConfirmation/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

const routes = rootPath => [
  {
    exact: true,
    path: `${rootPath}`,
    component: LoadableJoblist,
  },
  {
    exact: true,
    path: `${rootPath}/booking/:bookingId`,
    component: LoadableJoblistDetails,
  },
  {
    exact: true,
    path: `${rootPath}/confirmation`,
    component: LoadableJoblistConfirmation,
  },
];

export default routes;
