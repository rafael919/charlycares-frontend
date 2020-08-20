import { createSelector } from 'reselect';

const dataState = state => state.data;

export const getUser = createSelector([dataState], data => data.user);
export const getUserSettings = createSelector(
  [dataState],
  data => data.user.settings
);
export const getMembershipData = createSelector(
  [dataState],
  data => data.user.membershipData
);
export const getUserProfile = createSelector(
  [dataState],
  data => data.user.profile
);
export const getUserRole = createSelector([dataState], data => data.auth.role);
