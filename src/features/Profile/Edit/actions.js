import { actionCreatorGenerator } from 'Utils';

export const UPDATE_PROFILE_PENDING = 'profile/edit/updateProfilePending';
export const UPDATE_PROFILE_SUCCESS = 'profile/edit/updateProfileSuccess';
export const UPDATE_PROFILE_ERROR = 'profile/edit/updateProfileError';
export const UPDATE_STATUS_RESET = 'profile/edit/updateStatusReset';

export const onUpdateProfile = actionCreatorGenerator(
  UPDATE_PROFILE_PENDING,
  'role',
  'payload',
);

export const onUpdateProfileSuccess = actionCreatorGenerator(
  UPDATE_PROFILE_SUCCESS, 
  'payload'
);
export const onUpdateProfileError = actionCreatorGenerator(
  UPDATE_PROFILE_ERROR,
  'errors'
);

export const onUpdateStatusReset = actionCreatorGenerator(UPDATE_STATUS_RESET);
