import { createSelector } from 'reselect';

export const userState = state => state.data.user;

export const getReferralSettings = createSelector(
  [userState],
  user => user.referralSettings
);

