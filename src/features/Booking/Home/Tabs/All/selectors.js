import { createSelector } from 'reselect';

const bookingState = state => state.features.booking.data;

export const getEditedBooking = createSelector(
  bookingState,
  data => {
    return data.editedBooking;
  }
);
export const getCanceledBooking = createSelector(
  bookingState,
  data => {
    return data.canceledBooking;
  }
);
