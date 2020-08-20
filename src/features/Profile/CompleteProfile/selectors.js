import { createSelector } from 'reselect';

const userState = state => state.data.user;

export const getUserProfile = createSelector([userState], user => user.profile);
