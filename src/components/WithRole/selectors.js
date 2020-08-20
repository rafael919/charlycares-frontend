import { createSelector } from 'reselect';

const auth = state => state.data.auth;

export const getRole = createSelector([auth], auth => auth.role);
