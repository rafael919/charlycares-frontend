import { actionCreatorGenerator } from 'Utils';

export const GET_Landing_PageData_PENDING = 'landing/getLandingPageDataPending';
export const GET_Landing_PageData_SUCCESS = 'landing/getLandingPageDataSuccess';
export const GET_Landing_PageData_FAILURE = 'landing/getLandingPageDataError';

export const onGetLandingPageData = actionCreatorGenerator(
  GET_Landing_PageData_PENDING,
  'referenceNo',
  'target'
);
export const onGetLandingPageDataSuccess = actionCreatorGenerator(
  GET_Landing_PageData_SUCCESS,
  'payload'
);
export const onGetLandingPageDataError = actionCreatorGenerator(
  GET_Landing_PageData_FAILURE,
  'errors'
);
