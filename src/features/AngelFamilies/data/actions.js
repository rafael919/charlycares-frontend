import { actionCreatorGenerator } from 'Utils';

export const GET_FAMILIES_PENDING = 'angel/families/getFamiliesPending';
export const GET_FAMILIES_SUCCESS = 'angel/families/getFamiliesSuccess';
export const GET_FAMILIES_ERROR = 'angel/families/getFamiliesError';
export const GET_FAMILY_PROFILE_PENDING =
  'angel/families/getFamilyProfilePending';
export const GET_FAMILY_PROFILE_SUCCESS =
  'angel/families/getFamilyProfileSuccess';
export const GET_FAMILY_PROFILE_ERROR = 'angel/families/getFamilyProfileError';

export const onGetFamilies = actionCreatorGenerator(GET_FAMILIES_PENDING);
export const onGetFamiliesSuccess = actionCreatorGenerator(
  GET_FAMILIES_SUCCESS,
  'families',
  'activeSitting'
);
export const onGetFamiliesError = actionCreatorGenerator(
  GET_FAMILIES_ERROR,
  'errors'
);

export const onGetFamilyProfile = actionCreatorGenerator(
  GET_FAMILY_PROFILE_PENDING,
  'payload'
);
export const onGetFamilyProfileSuccess = actionCreatorGenerator(
  GET_FAMILY_PROFILE_SUCCESS,
  'payload'
);
export const onGetFamilyProfileError = actionCreatorGenerator(
  GET_FAMILY_PROFILE_ERROR,
  'errors'
);
