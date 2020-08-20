import { createSelector } from 'reselect';

const ui = state => state.ui;

export const getLoadingStatus = createSelector(
  [ui],
  data => data.isLoading
);
export const getErrors = createSelector(
  [ui],
  data => data.errors
);
export const getUpdateStatus = createSelector(
  [ui],
  data => data.update
);
export const getIndicators = createSelector(
  [ui],
  data => {
    return {
      newMessages: data.newMessages,
      pendingBookings: data.pendingBookings,
      pendingJobs: data.pendingJobs,
      activeTimer: data.activeTimer,
    };
  }
);
export const getUserStatus = createSelector(
  [ui],
  data => data.userStatus
);
