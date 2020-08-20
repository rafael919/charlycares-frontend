import { actionCreatorGenerator } from 'Utils';

export const PENDING = 'Pending';
export const ERROR = 'Error';
export const RESET = 'Reset';
export const SUCCESS = 'Success';
export const TIMEOUT = 'timeout';
export const INDICATORS_PENDING = 'indicators/Start';
export const INDICATORS_SUCCESS = 'indicators/Success';
export const APP_UPDATE = 'app_update';
export const APP_UPDATE_CLEAR = 'app_update_clear';

export const ON_TIMEOUT = 'errors/timeoutError';
export const ERROR_RESET = 'ui/errorReset';
export const SET_USER_STATUS = 'ui/setUserStatus';

export const onTimeout = actionCreatorGenerator(ON_TIMEOUT, 'errors');
export const onErrorConfirm = actionCreatorGenerator(ERROR_RESET);
export const onGetIndicators = actionCreatorGenerator(INDICATORS_PENDING);
export const onGetIndicatorsSuccess = actionCreatorGenerator(
  INDICATORS_SUCCESS,
  'payload'
);

export const onAppUpdate = actionCreatorGenerator(APP_UPDATE);
export const onAppUpdateClear = actionCreatorGenerator(APP_UPDATE_CLEAR);
export const setUserStatus = actionCreatorGenerator(SET_USER_STATUS, 'payload');
