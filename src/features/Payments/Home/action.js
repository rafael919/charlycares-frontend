import { actionCreatorGenerator } from 'Utils';

export const GET_PAYMENTS_PENDING = 'payments/getPaymentsPending';
export const GET_PAYMENTS_SUCCESS = 'payments/getPaymentsSuccess';
export const GET_PAYMENTS_ERROR = 'payments/getPaymentsError';

export const onGetPayments = actionCreatorGenerator(GET_PAYMENTS_PENDING);
export const onGetPaymentsSuccess = actionCreatorGenerator(
  GET_PAYMENTS_SUCCESS,
  'payload'
);
export const onGetPaymentsError = actionCreatorGenerator(
  GET_PAYMENTS_ERROR,
  'errors'
);
