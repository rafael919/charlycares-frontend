import { createSelector } from 'reselect';

const listingsState = state => state.features.listings;
const bookingsState = state => state.features.booking.data;
const id = (_, props) => {
  return props.match.params.bookingId;
};

export const getListings = createSelector(
  [listingsState],
  state => state.listings
);

export const getBookingById = createSelector(
  [bookingsState, id],
  (data, id) => {
    if (data.bookings) {
      return data.bookings.find(b => b.id === Number(id));
    }
    return null;
  }
);
