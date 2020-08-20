import { createSelector } from 'reselect';

const userData = state => state.data.user;
const profileData = state => state.features.profile;

export const getUserProfile = createSelector(
  userData,
  user => user.profile
);

export const getUserRole = createSelector(
  [userData],
  user => user.role
);

export const getUpdateStatus = createSelector(
  [profileData],
  profile => profile.edit
);
