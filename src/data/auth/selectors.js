import { createSelector } from 'reselect';

const getAuthState = state => state.data.auth;

export const getToken = createSelector(getAuthState, auth => auth.token);
export const getAuthStatus = createSelector(
  getAuthState,
  auth => auth.isAuthenticated
);

export const getHasDownloadedApp = createSelector(
  getAuthState,
  auth => auth.hasDownloadedApp
);

export const getMembershipStatus = createSelector(
  getAuthState,
  auth => auth.hasMembership
);
export const getCanceledMembershipStatus = createSelector(
  getAuthState,
  auth => auth.hasCanceledMembership
);
export const getSuspendedStatus = createSelector(
  getAuthState,
  auth => auth.isSuspended
);
export const getAcceptedStatus = createSelector(
  getAuthState,
  auth => auth.isAccepted
)
export const getAppointmentStatus = createSelector(
  getAuthState,
  auth => auth.hasAppointment
)

export const getDismissedStatus = createSelector(
  getAuthState,
  auth => auth.isDismissed
);

export const getRetiredStatus = createSelector(
  getAuthState,
  auth => auth.isRetired
);

export const getRoleStatus = createSelector(
  getAuthState,
  auth => auth.role
);

export const getPaymentLink = createSelector(
  getAuthState,
  auth => auth.payment_link
);
export const getTimerStatus = createSelector(
  getAuthState,
  auth => auth.hasActiveTimer
)
export const getUserRole = createSelector(getAuthState, auth => auth.role);

