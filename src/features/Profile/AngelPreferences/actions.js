import { actionCreatorGenerator } from 'Utils';
export const GET_PREFERENCES_PENDING =
  'profile/preferences/getPreferencesPending';
export const GET_PREFERENCES_SUCCESS =
  'profile/preferences/getPreferencesSuccess';
export const GET_PREFERENCES_ERROR = 'profile/preferences/getPreferencesError';
export const PREFERENCES_UPDATE_PENDING =
  'profile/preferences/updatePreferencesPending';
export const PREFERENCES_UPDATE_SUCCESS =
  'profile/preferences/updatePreferencesSuccess';
export const PREFERENCES_UPDATE_ERROR =
  'profile/preferences/updatePreferencesError';

export const onGetPreferences = actionCreatorGenerator(GET_PREFERENCES_PENDING);
export const onGetPreferencesSuccess = actionCreatorGenerator(
  GET_PREFERENCES_SUCCESS,
  'payload'
);
export const onGetPreferencesError = actionCreatorGenerator(
  GET_PREFERENCES_ERROR,
  'errors'
);

export const onUpdatePreferences = actionCreatorGenerator(
  PREFERENCES_UPDATE_PENDING,
  'payload'
);
export const onUpdatePreferencesSuccess = actionCreatorGenerator(
  PREFERENCES_UPDATE_SUCCESS,
  'payload'
);
export const onUpdatePreferencesError = actionCreatorGenerator(
  PREFERENCES_UPDATE_ERROR,
  'errors'
);
