import { createSelector } from 'reselect';

const paymentsState = state => state.features.payments.angelPayments;
const userState = state => state.data.user;

export const getAngelPayments = createSelector(
  [paymentsState],
  angelPayments => {
    return angelPayments.payments;
  }
);

export const getAngelPaymentsTotal = createSelector(
  [paymentsState],
  angelPayments => {
    return angelPayments.payments_per_year;
  }
);

export const getAngelCredit = createSelector(
  [paymentsState],
  angelPayments => {
    return angelPayments.credit;
  }
);

export const getReferrals = createSelector(
  [userState],
  user => user.referralSettings
);
