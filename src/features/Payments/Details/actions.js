import { actionCreatorGenerator } from 'Utils';

export const GET_RATES_PENDING = 'payments/getRatesPending';
export const GET_RATES_SUCCESS = 'payments/getRatesSuccess';
export const GET_RATES_ERROR = 'payments/getRatesError';

export const onGetRates = actionCreatorGenerator(GET_RATES_PENDING);
export const onGetRatesSuccess = actionCreatorGenerator(
  GET_RATES_SUCCESS,
  'payload'
);
export const onGetRatesError = actionCreatorGenerator(
  GET_RATES_ERROR,
  'errors'
);
