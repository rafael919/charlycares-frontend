import { createSelector } from 'reselect';

const userState = state => state.data.user;

export const getReferralSettings = createSelector(
  [userState],
  user => user.referralSettings
);
