import { createSelector } from 'reselect';

const userState = state => state.data.user;

export const getActiveStatusAndInactiveEnd = createSelector(
  [userState],
  user => {
    return {
      isActive: user.is_active,
      inactiveEnd: user.inactive_end,
    };
  }
);
