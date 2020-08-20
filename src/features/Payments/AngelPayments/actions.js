import { actionCreatorGenerator } from 'Utils';

export const GET_ANGEL_PAYMENTS_PENDING =
  'payments/angel/getAngelPaymentsPending';
export const GET_ANGEL_PAYMENTS_SUCCESS =
  'payments/angel/getAngelPaymentsSuccess';
export const GET_ANGEL_PAYMENTS_ERROR = 'payments/angel/getAngelPaymentsError';

export const onGetAngelPayments = actionCreatorGenerator(
  GET_ANGEL_PAYMENTS_PENDING
);
export const onGetAngelPaymentsSuccess = actionCreatorGenerator(
  GET_ANGEL_PAYMENTS_SUCCESS,
  'payload'
);
export const onGetAngelPaymentsError = actionCreatorGenerator(
  GET_ANGEL_PAYMENTS_ERROR,
  'errors'
);
