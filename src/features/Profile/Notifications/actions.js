import { actionCreatorGenerator } from 'Utils';

export const GET_DASHBOARD_DATA_PENDING =
  'profile/Notifications/getDashboardDataPending';
export const GET_DASHBOARD_DATA_SUCCESS =
  'profile/Notifications/getDashboardDataSuccess';
export const GET_DASHBOARD_DATA_ERROR =
  'profile/Notifications/getDashboardDataError';

export const onGetDashboardData = actionCreatorGenerator(
  GET_DASHBOARD_DATA_PENDING
);
export const onGetDashboardDataSuccess = actionCreatorGenerator(
  GET_DASHBOARD_DATA_SUCCESS,
  'messages'
);
export const onGetDashboardDataError = actionCreatorGenerator(
  GET_DASHBOARD_DATA_ERROR,
  'errors'
);
