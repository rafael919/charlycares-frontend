import { createSelector } from 'reselect';

const userData = state => state.data.user;
const profileData = state => state.features.profile;

export const getCredit = createSelector(
  [userData],
  user => user.profile && user.profile.credit
);
export const getReferralSettings = createSelector(
  [userData],
  user => user.referralSettings
);

export const getIsCouponValid = createSelector(
  [profileData],
  profile => profile.credit.isCodeValid
);

export const getMessage = createSelector(
  [profileData],
  profile => profile.credit.message
);
export const getType = createSelector(
  [profileData],
  profile => profile.credit.type
);
