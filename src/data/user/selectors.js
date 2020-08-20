import { createSelector } from 'reselect';

const getData = state => state.data;

export const getUser = createSelector(
  [getData],
  data => data.user
);
