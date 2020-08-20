import { createSelector } from 'reselect';

const paymentState = state => state.features.payments;

const paymentDetails = createSelector(
  [paymentState],
  payments => payments.details
);

export const getRates = createSelector(
  [paymentDetails],
  payments => payments.rates
);
export const getPayments = createSelector(
  [paymentState],
  payments => payments.home.payments
);
export const getAngelPayments = createSelector([paymentState], payments => {
  return payments.angelPayments.payments;
});
