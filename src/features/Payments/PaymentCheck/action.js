import { actionCreatorGenerator } from 'Utils';

export const GET_OUTSTANDING_PAYMENTS_PENDING = 'outstandingPayments/getOutPaymentsPending';
export const GET_OUTSTANDING_SUCCESS = 'outstandingPayments/getOutstandingPaymentsSuccess';
export const GET_OUTSTANDING_ERROR = 'outstandingPayments/getOutstandingPaymentsError';

export const onGetoutStandingPayments = actionCreatorGenerator(
  GET_OUTSTANDING_PAYMENTS_PENDING,
  'referenceNo'
);
export const onGetoutstandingPaymentsSuccess = actionCreatorGenerator(
  GET_OUTSTANDING_SUCCESS,
  'payload'
);
export const onGetoutstandingPaymentsError = actionCreatorGenerator(
  GET_OUTSTANDING_ERROR,
  'errors'
);
