import { createSelector } from 'reselect';

const bookingData = state => state.features.booking;

export const getBookings = createSelector(
  [bookingData],
  booking => booking.data.bookings
);
