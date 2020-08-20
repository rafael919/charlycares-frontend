import { createSelector } from 'reselect';

const userState = state => state.data.user;
const dataState = state => state.data;

export const getUserProfile = createSelector([userState], user => user.profile);
export const getNumberOfUnreadMessages = createSelector(
  [userState],
  user => user.unreadMessages
);
export const getUserLanguages = createSelector(
  [userState],
  user => user.languages
);
export const getCredit = createSelector([userState], user => {
  return user.profile && user.profile.credit;
});

export const getUser = createSelector(
  [dataState],
  data => data.user
);
