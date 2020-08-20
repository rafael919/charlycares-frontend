import { createSelector } from 'reselect';

const dataState = state => state.data;
const profileState = state => state.features.profile;
const userState = state => state.data.user;

export const getUser = createSelector(
  [dataState],
  data => data.user
);
export const getUserRole = createSelector(
  [dataState],
  data => data.auth.role
);
export const getMessages = createSelector(
  [profileState],
  profile => profile.dashboard.messages
);
export const getNumberOfUnreadMessages = createSelector(
  [userState],
  user => user.unreadMessages
);

export const getRatings = createSelector(
  [userState],
  user => user.profile.ratings
);
