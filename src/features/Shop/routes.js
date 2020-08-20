import { isMobile } from 'react-device-detect';
import Loadable from 'react-loadable';
import Loader from 'Components/Loader';
import React from 'react';

export const LoadableShopHome = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "shop-home" */ './Home');
    }
    return import(/* webpackChunkName: "shop-home-desktop" */ './Home/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableShopGetPointsHelp = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "shop-get-points-help" */ './GetPointsHelp'
      );
    }
    return import(
      /* webpackChunkName: "shop-get-points-help-desktop" */ './GetPointsHelp/Desktop'
    );
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableShopPurchases = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "shop-purchases" */ './Purchases');
    }
    return import(
      /* webpackChunkName: "shop-purchases-desktop" */ './Purchases/Desktop'
    );
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableShopHistory = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "shop-history" */ './History');
    }
    return import(
      /* webpackChunkName: "shop-history-desktop" */ './History/Desktop'
    );
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableShopPurchase = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "shop-purchase" */ './Purchase');
    }
    return import(
      /* webpackChunkName: "shop-purchase-desktop" */ './Purchase/Desktop'
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
    component: LoadableShopHome,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/help`,
    component: LoadableShopGetPointsHelp,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/purchases`,
    component: LoadableShopPurchases,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/history`,
    component: LoadableShopHistory,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/purchase/:giftId`,
    component: LoadableShopPurchase,
    protected: true,
    allowedRoles: ['angel'],
  },
];

export default routes;
