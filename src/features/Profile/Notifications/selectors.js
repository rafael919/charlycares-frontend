import { createSelector } from 'reselect';

const profileState = state => state.features.profile;

export const getMessages = createSelector(
  [profileState],
  profile => profile.familyNotifications.messages
);
