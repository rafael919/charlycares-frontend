import { createSelector } from 'reselect';

const bookingsState = state => state.features.booking.data;

export const getEditedBooking = createSelector(
  [bookingsState],
  booking => {
    return booking.editedBooking;
  }
);
export const getAngelSelectedDays = createSelector(
  [bookingsState],
  booking => {
    return booking.angelSelectedDays;
  }
);
export const getAngelDeselectedDays = createSelector(
  [bookingsState],
  booking => {
    return booking.angelDeselectedDays;
  }
);
export const getCurrentBookingId = createSelector(
  [bookingsState],
  booking => {
    return booking.currentAngelBookingId;
  }
);
