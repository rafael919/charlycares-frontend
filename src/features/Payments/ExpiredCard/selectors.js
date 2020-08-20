import { createSelector } from 'reselect';

const dataState = state => state.data;

export const getUserProfile = createSelector(
  [dataState],
  data => data.user.profile
);
