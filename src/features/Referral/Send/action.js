import { actionCreatorGenerator } from 'Utils';

export const GET_InviteData_PENDING = 'landing/getInviteData';
export const GET_InviteData_SUCCESS = 'landing/getInviteDataSuccess';
export const GET_InviteData_FAILURE = 'landing/getInviteDataError';

export const onGetInviteData = actionCreatorGenerator(
  GET_InviteData_PENDING,
  'userID'
);
export const onGetInviteDataSuccess = actionCreatorGenerator(
  GET_InviteData_SUCCESS,
  'payload'
);
export const onGetInviteDataError = actionCreatorGenerator(
  GET_InviteData_FAILURE,
  'errors'
);
