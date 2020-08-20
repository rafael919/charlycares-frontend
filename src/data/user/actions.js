//@flow
import { SIGNUP_SUCCESS, LOGIN_SUCCESS } from '../actionTypes';
import { actionCreatorGenerator } from 'Utils';

export const LOGIN_REQ = 'login/REQ';
export const LOGIN_FAILURE = 'login/FAILURE';
export const SIGNUP_REQ_ANGEL = 'signupAngel/Pending';
export const SIGNUP_REQ_FAMILY = 'signupFamily/Pending';
export const SIGNUP_FAILURE = 'signup/Error';
export const UPLOADED_VIDEO_SUCCESS = 'profile/angelAccount/onUploadedVideoSuccess'; 
export const UPDATE_PROFILE_DATA = 'profile/updateUserProfile';
export const UPDATE_PROFILE_DATA_SUCCESS =
  'profile/onUpdateUserProfileDataSuccess';
export const ON_USER_ADD_CREDIT = 'profile/onUserAddCredit';
export const ON_MEMBERSHIP_UPDATE_SUCCESS = 'profile/onMembershipUpdateSuccess';

export const GET_USER_PROFILE_DATA_PENDING =
  'profile/getUserProfileDataPending';
export const GET_USER_PROFILE_DATA_SUCCESS =
  'profile/getUserProfileDataSuccess';
export const GET_USER_PROFILE_DATA_ERROR = 'profile/getUserProfileDataError';
export const GET_PROFILE_PENDING = 'profile/getProfilePending';
export const GET_PROFILE_SUCCESS = 'profile/getProfileSuccess';
export const GET_PROFILE_ERROR = 'profile/getProfileError';
export const SET_IMAGE = 'profile/edit/setImage';
export const ON_ANGEL_VIDEO_REMOVE_PENDING =
  'profile/angelAccount/angelVideoRemovePending';
export const ON_ANGEL_VIDEO_REMOVE_ERROR =
  'profile/angelAccount/angelVideoRemoveError';
export const ON_ANGEL_VIDEO_REMOVE_SUCCESS =
  'profile/angelAccount/angelVideoRemoveSuccess';

export type PayloadFamily = {
  locale: string,
  email: string,
  password: string,
  password_confirmation: string,
  postalcode: string,
  phone: string,
  first_name: string,
  last_name: string,
  street_number: string,
  city: string,
  street_name: string,
  gender: string,
  confirmation_link: string,
  kids: Array<string>,
};

export type PayloadAngel = {
  locale: string,
  email: string,
  password: string,
  password_confirmation: string,
  postalcode: string,
  phone: string,
  first_name: string,
  last_name: string,
  street_number: string,
  city: string,
  street_name: string,
  gender: string,
  confirmation_link: string,
  nationality: string,
  education: string,
  field_of_study: string,
  liability_insurance: boolean,
  driving_licence: boolean,
  birthdate: string,
};

export type SignUpReqFamilyAction = {
  type: string,
  payload: PayloadFamily,
};

export type SignUpResFamilyAction = {
  type: string,
  payload: PayloadFamily,
};

export type SignUpReqAngelAction = {
  type: string,
  payload: PayloadAngel,
};

export type LoginPayload = {
  email: string,
  password: string,
};

export const onLoginReq = (payload: LoginPayload) => ({
  type: LOGIN_REQ,
  payload,
});

export const onLoginSuccess = (payload: Object) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const onLoginFail = (errors: Object) => ({
  type: LOGIN_FAILURE,
  errors,
});

export const onFamilySignupReq = (payload: Object) =>
  ({
    type: SIGNUP_REQ_FAMILY,
    payload,
  }: SignUpReqFamilyAction);

export const onAngelSignupReq = (payload: Object) =>
  ({
    type: SIGNUP_REQ_ANGEL,
    payload,
  }: SignUpReqFamilyAction);

export const onSignupSuccess = (payload: Object) => {
  return ({
    type: SIGNUP_SUCCESS,
    payload,
  }: SignUpResFamilyAction);
};

export const onSignupFailure = (errors: Object) => ({
  type: SIGNUP_FAILURE,
  errors,
});

export const onGetUserProfileData = actionCreatorGenerator(
  GET_USER_PROFILE_DATA_PENDING
);

export const onUpdateUserProfileData = actionCreatorGenerator(
  UPDATE_PROFILE_DATA
);

export const onUpdateUserProfileDataSuccess = actionCreatorGenerator(
  UPDATE_PROFILE_DATA_SUCCESS,
  'payload'
);
export const onGetUserProfileDataSuccess = actionCreatorGenerator(
  GET_USER_PROFILE_DATA_SUCCESS,
  'payload'
);

export const onUserAddCredit = actionCreatorGenerator(
  ON_USER_ADD_CREDIT,
  'payload'
);

export const onMembershipUpdateSuccess = actionCreatorGenerator(
  ON_MEMBERSHIP_UPDATE_SUCCESS,
  'payload'
);
export const onGetUserProfileDataError = actionCreatorGenerator(
  GET_USER_PROFILE_DATA_ERROR,
  'errors'
);

export const onUploadedVideoSuccess = actionCreatorGenerator(
  UPLOADED_VIDEO_SUCCESS, 
  'payload'
);

export const onGetProfile = actionCreatorGenerator(GET_PROFILE_PENDING);
export const onGetProfileSuccess = actionCreatorGenerator(
  GET_PROFILE_SUCCESS,
  'payload'
);
export const onGetProfileError = actionCreatorGenerator(
  GET_PROFILE_ERROR,
  'errors'
);

export const onSetImage = actionCreatorGenerator(SET_IMAGE, 'payload');
export const onAngelVideoRemove = actionCreatorGenerator(
  ON_ANGEL_VIDEO_REMOVE_PENDING
);
export const onAngelVideoRemoveErr = actionCreatorGenerator(
  ON_ANGEL_VIDEO_REMOVE_ERROR,
  'errors'
);
export const onAngelVideoRemoveSuccess = actionCreatorGenerator(
  ON_ANGEL_VIDEO_REMOVE_SUCCESS
);
