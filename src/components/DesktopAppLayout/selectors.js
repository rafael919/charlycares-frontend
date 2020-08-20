import { createSelector } from 'reselect';


const userState = state => state.data.user;

export const getDisturbModeStatus = createSelector([userState], user => {
  return user && user.angel ? user.angel.inactive_end : null;
});