import { actionCreatorGenerator } from 'Utils';

export const GET_DASHBOARD_DATA_PENDING =
  'profile/angelDashboard/getDashboardDataPending';
export const GET_DASHBOARD_DATA_SUCCESS =
  'profile/angelDashboard/getDashboardDataSuccess';
export const GET_DASHBOARD_DATA_ERROR =
  'profile/angelDashboard/getDashboardDataError';

export const RATE_UPDATE_PENDING = 'profile/angelDashboard/rateUpdatePending';
export const RATE_UPDATE_SUCCESS = 'profile/angelDashboard/rateUpdateSuccess';
export const RATE_UPDATE_ERROR = 'profile/angelDashboard/rateUpdateError';

export const onGetDashboardData = actionCreatorGenerator(
  GET_DASHBOARD_DATA_PENDING
);
export const onGetDashboardDataSuccess = actionCreatorGenerator(
  GET_DASHBOARD_DATA_SUCCESS,
  'angelData',
  'messages',
  'referrals'
);
export const onGetDashboardDataError = actionCreatorGenerator(
  GET_DASHBOARD_DATA_ERROR,
  'errors'
);

export const onRateUpdate = actionCreatorGenerator(
  RATE_UPDATE_PENDING,
  'payload'
);
export const onRateUpdateSuccess = actionCreatorGenerator(RATE_UPDATE_SUCCESS);
export const onRateUpdateError = actionCreatorGenerator(
  RATE_UPDATE_ERROR,
  'errors'
);
