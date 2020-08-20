import { actionCreatorGenerator } from 'Utils';

export const UPDATE_SETTINGS_PENDING =
  'profile/accountAndSettings/updateSettingsPending';
export const UPDATE_SETTINGS_SUCCESS =
  'profile/accountAndSettings/updateSettingsSuccess';
export const UPDATE_SETTINGS_ERROR =
  'profile/accountAndSettings/updateSettingsError';
export const UPDATE_FB_INFO_PENDING = 'profile/updateFBInfoPending';
export const UPDATE_FB_INFO_SUCCESS = 'profile/updateFBInfoSuccess';
export const UPDATE_FB_INFO_ERROR = 'profile/updateFBInfoError';

export const onSettingsUpdate = actionCreatorGenerator(
  UPDATE_SETTINGS_PENDING,
  'payload'
);
export const onSettingsUpdateSuccess = actionCreatorGenerator(
  UPDATE_SETTINGS_SUCCESS, 
  'payload'
);
export const onSettingsUpdateError = actionCreatorGenerator(
  UPDATE_SETTINGS_ERROR,
  'errors'
);

export const onFBInfoUpdate = actionCreatorGenerator(
  UPDATE_FB_INFO_PENDING,
  'payload'
);
export const onFBInfoSuccess = actionCreatorGenerator(UPDATE_FB_INFO_SUCCESS);
export const onFBInfoError = actionCreatorGenerator(
  UPDATE_FB_INFO_ERROR,
  'errors'
);
