import { actionCreatorGenerator } from 'Utils';

export const UPDATE_PROFILE_PENDING =
  'profile/angelAccount/updateProfilePending';
export const UPDATE_PROFILE_SUCCESS =
  'profile/angelAccount/updateProfileSuccess';
export const UPDATE_PROFILE_ERROR = 'profile/angelAccount/updateProfileError';

export const onUpdateProfile = actionCreatorGenerator(
  UPDATE_PROFILE_PENDING,
  'payload'
);
export const onUpdateProfileSuccess = actionCreatorGenerator(
  UPDATE_PROFILE_SUCCESS,
  'payload'
);
export const onUpdateProfileError = actionCreatorGenerator(
  UPDATE_PROFILE_ERROR,
  'errors'
);

