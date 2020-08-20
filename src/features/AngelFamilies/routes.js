import React from 'react';
import Loadable from 'react-loadable';
import Loader from 'Components/Loader';
import { isMobile } from 'react-device-detect';

export const LoadableFamilyProfile = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "angel-family-profile" */ './FamilyProfile'
      );
    }
    return import(
      /* webpackChunkName: "angel-family-profile-desktop" */ './FamilyProfile/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadableFamilies = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "angel-families" */ './Families/');
    }
    return import(
      /* webpackChunkName: "angel-families-desktop" */ './Families/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

const routes = rootRoute => [
  {
    exact: true,
    path: `${rootRoute}`,
    component: LoadableFamilies,
  },
  {
    exact: true,
    path: `${rootRoute}/:familyId`,
    component: LoadableFamilyProfile,
  },
];

export default routes;
