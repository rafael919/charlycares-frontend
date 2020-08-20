import { createSelector } from 'reselect';

const bookingState = state => state.features.booking;

const bookingFilters = createSelector(
  [bookingState],
  booking => booking.bookingFilters
);

export const getDefaultFilters = createSelector(
  [bookingFilters],
  filters => filters.default
);
export const getFilterValues = createSelector(
  [bookingFilters],
  filters => filters.selected
);
