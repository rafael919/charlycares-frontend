import { createSelector } from 'reselect';

const paymentsData = state => state.features.payments;
export const userState = state => state.data.user;

export const getPayments = createSelector(
  [paymentsData],
  payments => payments.home.payments
);

export const getPaidPayments = createSelector(
  [getPayments],
  payments => {
    return payments.filter(payment => payment.current_state === 'paid' || payment.current_state === 'unpaid');
  }
);

export const getChargeBackPayments = createSelector(
  [getPayments],
  payments => {
    return payments.filter(payment => payment.current_state === 'chargeback');
  }
);

export const getReferrals = createSelector(
  [userState],
  user => user.referralSettings
);

export const getCredit = createSelector(
  [userState],
  userState => {
    if (userState.referralSettings) {
      return userState.referralSettings.user_credit;
    }
    return '';
  }
);
