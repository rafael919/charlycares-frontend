import { createSelector } from 'reselect';

const userData = state => state.data.user;

const profileData = state => state.features.profile;

export const getMembershipData = createSelector(
  [userData],
  user => user.membershipData
);

export const getMembershipStatus = createSelector(
  [profileData],
  profile => profile.membership.isMembershipCanceled
);
export const getMembershipUpdateStatus = createSelector(
  [profileData],
  profile => profile.membership.isMembershipUpdated
);
