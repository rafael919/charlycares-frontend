import { createSelector } from 'reselect';

const bookingState = state => state.features.booking;

const bookingAngel = createSelector(
  [bookingState],
  booking => booking.bookingAngel
);

export const getAngelData = createSelector(
  [bookingAngel],
  data => data.angel
);
export const getPrevAngelData = createSelector(
  [bookingAngel],
  data => data.prevAngel
);
export const getNextAngelData = createSelector(
  [bookingAngel],
  data => data.nextAngel
);
export const getDays = createSelector(
  [bookingState],
  data => data.bookingCreate.days
);
