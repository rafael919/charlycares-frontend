import { createSelector } from 'reselect';

const paymentsData = state => state.features.payments.outStandingPayments;;
export const userState = state => state.data.user;

export const getOutstandingPayments = createSelector(
  [paymentsData],
  outStandingPayments => {
    return outStandingPayments.payments;
  }
);

