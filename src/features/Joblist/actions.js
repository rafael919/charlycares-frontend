import { actionCreatorGenerator } from 'Utils';

export const GET_LISTINGS_PENDING =
  'joblist/getListingsPending';
export const GET_LISTINGS_SUCCESS =
  'joblist/getListingsSuccess';
export const GET_LISTINGS_ERROR =
  'joblist/getListingsError';
export const ANGEL_JOB_ACCEPT_PENDING =
  'joblist/angelJobAcceptPending';
export const ANGEL_JOB_ACCEPT_SUCCESS =
  'joblist/angelJobAcceptSuccess';
export const ANGEL_JOB_ACCEPT_ERROR =
  'joblist/angelJobAcceptError';

export const onGetListings = actionCreatorGenerator(
  GET_LISTINGS_PENDING
);
export const onGetListingsSuccess = actionCreatorGenerator(
  GET_LISTINGS_SUCCESS,
  'listings'
);
export const onGetListingsError = actionCreatorGenerator(
  GET_LISTINGS_ERROR,
  'errors'
);

export const onAngelAcceptJob = actionCreatorGenerator(
  ANGEL_JOB_ACCEPT_PENDING,
  'payload',
  'history'
);
export const onAngelAcceptJobSuccess = actionCreatorGenerator(
  ANGEL_JOB_ACCEPT_SUCCESS
);
export const onAngelAcceptJobError = actionCreatorGenerator(
  ANGEL_JOB_ACCEPT_ERROR,
  'errors'
);
