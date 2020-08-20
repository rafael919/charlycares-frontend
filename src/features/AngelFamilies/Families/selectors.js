import { createSelector } from 'reselect';

const userState = state => state.data.user;

const familiesState = state => state.features.families.data;

export const getUserId = createSelector(
  [userState],
  user => user.user_id
);
export const getActiveSitting = createSelector(
  [familiesState],
  families => families.activeSitting
);
