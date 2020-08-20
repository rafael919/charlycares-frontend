import { createSelector } from 'reselect';

const bookingState = state => state.features.booking;
const userState = state => state.data.user;

const bookingSend = createSelector(
  [bookingState],
  booking => booking.bookingSend
);

export const getSubscriptionPlan = createSelector(
  [userState],
  user => {
    return user.membership.current_state;
  }
);

export const getMessage = createSelector(
  bookingSend,
  send => send.message
);
