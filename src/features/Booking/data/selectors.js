import { createSelector } from 'reselect';

const bookingState = state => state.features.booking;

const bookingData = createSelector(
  bookingState,
  booking => booking.data
);

export const getAvailableAngels = createSelector(
  bookingData,
  data => data.availableAngels
);

export const getMatched = createSelector(
  [bookingData],
  data => data.filteredAngels.match
);
export const getNotMatched = createSelector(
  [bookingData],
  data => data.filteredAngels.notMatch
);
export const getNumberOfActiveFilters = createSelector(
  [bookingData],
  data => data.filteredAngels.numberOfActiveFilters
);

export const getSelectedAngels = createSelector(
  [bookingData],
  data => data.selectedAngels
);
export const getBookings = createSelector(
  [bookingData],
  data => data.bookings
);
export const getLikedAngels = createSelector(
  bookingData,
  data => data.likedAngels
);
