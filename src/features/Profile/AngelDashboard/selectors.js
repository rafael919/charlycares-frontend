import { createSelector } from 'reselect';

const profileState = state => state.features.profile;
const userState = state => state.data.user;

export const getMessages = createSelector(
  [profileState],
  profile => profile.dashboard.messages
);
export const getAngelData = createSelector(
  [profileState],
  profile => profile.dashboard.angelData
);
export const getCredit = createSelector(
  [userState],
  user => user.profile.credit
);
