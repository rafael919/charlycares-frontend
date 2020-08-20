import { createSelector } from 'reselect';

const profileState = state => state.features.profile;

const userState = state => state.data.user;

export const getUserProfile = createSelector([userState], user => {
  return user.profile;
});

export const getPreferences = createSelector(
  [profileState],
  profile => profile.preferences
);
