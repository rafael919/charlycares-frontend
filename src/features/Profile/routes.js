import { isMobile } from 'react-device-detect';
import Loadable from 'react-loadable';
import Loader from 'Components/Loader';
import React from 'react';

export const LoadableProfileHome = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "profile-home" */ './Home');
    }
    return import(
      /* webpackChunkName: "profile-home-desktop" */ './Home/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableEdit = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "profile-edit" */ './Edit');
    }
    return import(
      /* webpackChunkName: "profile-edit-desktop" */ './Edit/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableComplete = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "profile-complete" */ './CompleteProfile'
      );
    }
    return import(
      /* webpackChunkName: "profile-complete-desktop" */ './CompleteProfile'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadablePushSettings = Loadable({
  loader: () => {
    return import(
      /* webpackChunckName: "profile-push-settings" */ './PushSettings'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableSettings = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "profile-settings" */ './AccountSettings'
      );
    }
    return import(
      /* webpackChunkName: "profile-settings-desktop" */ './AccountSettings/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableCredit = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "profile-credit" */ './Credit');
    }
    return import(
      /* webpackChunkName: "profile-credit-desktop" */ './Credit/Desktop'
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
        /* webpackChunkName: "profile-membership" */ './Membership'
      );
    }
    return import(
      /* webpackChunkName: "profile-membership-desktop" */ './Membership/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableMembershipCancel = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "profile-membership-cancel" */ './Membership/CancelConfirmation'
      );
    }
    return import(
      /* webpackChunkName: "profile-membership-cancel-desktop" */ './Membership/CancelConfirmation/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableConditions = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "profile-conditions" */ './GeneralConditions'
      );
    }
    return import(
      /* webpackChunkName: "profile-conditions-desktop" */ './GeneralConditions/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableAngel = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "profile-angel-profile" */ './AngelProfile'
      );
    }
    return import(
      /* webpackChunkName: "profile-angel-profile-desktop" */ './AngelProfile/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableAngelAcc = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "profile-angel-account" */ './AngelAccount'
      );
    }
    return import(
      /* webpackChunkName: "profile-angel-account-desktop" */ './AngelAccount/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableAngelDashboard = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "profile-angel-dashboard" */ './AngelDashboard'
      );
    }
    return import(
      /* webpackChunkName: "profile-angel-dashboard-desktop" */ './AngelDashboard/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableFamilyNotifications = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "profile-notifications" */ './Notifications'
      );
    }
    return import(
      /* webpackChunkName: "profile-notifications-desktop" */ './Notifications/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableAngelPreferences = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "profile-angel-preferences" */ './AngelPreferences'
      );
    }
    return import(
      /* webpackChunkName: "profile-angel-preferences-desktop" */ './AngelPreferences/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableHelp = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "profile-help" */ './Help');
    }
    return import(
      /* webpackChunkName: "profile-help-desktop" */ './Help/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadableRatingsAndReviews = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "ratings-reviews" */ './RatingAndReviews'
      );
    }
    return import(
      /* webpackChunkName: "ratings-reviews-desktop" */ './RatingAndReviews/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableReferrals = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "profile-referrals" */ './Referrals');
    }
    return import(
      /* webpackChunkName: "profile-referrals-desktop" */ './Referrals/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableAngelReview = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "angel-review" */ './AngelReview');
    }
    return import(
      /* webpackChunkName: "angel-review-desktop" */ './AngelReview/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadableReview = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "review" */ './Review');
    }
    return import(/* webpackChunkName: "review-desktop" */ './Review/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const Angel = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "profile-angel" */ '../Angel');
    }
    return import(
      /* webpackChunkName: "profile-angel-desktop" */ '../Angel/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const Family = Loadable({
  loader: () => {
    if (isMobile) {
      return import(
        /* webpackChunkName: "profile-family" */ '../AngelFamilies/FamilyProfile'
      );
    }
    return import(
      /* webpackChunkName: "profile-family-desktop" */ '../AngelFamilies/FamilyProfile/Desktop'
    );
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const Shop = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/** webpackChunkName: "shop" */ '../Shop');
    }
    return import(/** webpackChunkName: "shop-desktop" */ '../Shop/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const preloadAllRoutes = () => {
  LoadableSettings.preload();
  LoadableCredit.preload();
  LoadableEdit.preload();
  LoadableMembership.preload();
  LoadableConditions.preload();
  LoadableAngelPreferences.preload();
  LoadableHelp.preload();
};

const routes = rootRoute => [
  {
    exact: true,
    path: `${rootRoute}`,
    component: LoadableProfileHome,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: true,
    path: `${rootRoute}`,
    component: LoadableAngel,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/edit`,
    component: LoadableAngelAcc,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/edit`,
    component: LoadableEdit,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: true,
    path: `${rootRoute}/complete`,
    component: LoadableComplete,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: true,
    path: `${rootRoute}/rating-reviews`,
    component: LoadableRatingsAndReviews,
    protected: true,
    allowedRoles: ['family', 'angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/referrals/:role`,
    component: LoadableReferrals,
    protected: true,
    allowedRoles: ['family', 'angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/rating-reviews/:id`,
    component: LoadableReview,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: true,
    path: `${rootRoute}/rating-reviews/:id`,
    component: LoadableAngelReview,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/settings`,
    component: LoadableSettings,
    protected: true,
    allowedRoles: ['family', 'angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/push-settings`,
    component: LoadablePushSettings,
    protected: true,
    allowedRoles: ['family', 'angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/credit`,
    component: LoadableCredit,
    protected: true,
    allowedRoles: ['family', 'angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/membership`,
    component: LoadableMembership,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: true,
    path: `${rootRoute}/membership/cancel`,
    component: LoadableMembershipCancel,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: true,
    path: `${rootRoute}/conditions`,
    component: LoadableConditions,
    protected: true,
    allowedRoles: ['family', 'angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/dashboard`,
    component: LoadableAngelDashboard,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/notifications`,
    component: LoadableFamilyNotifications,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: true,
    path: `${rootRoute}/preferences`,
    component: LoadableAngelPreferences,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/help`,
    component: LoadableHelp,
    protected: true,
    allowedRoles: ['family', 'angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/shop`,
    component: Shop,
    protected: true,
    allowedRoles: ['angel'],
  },
];

export default routes;
