import { createSelector } from 'reselect';

const calendarData = state => state.features.calendar;
const bookingsData = state => state.features.booking;
const userData = state => state.data.user;

export const getAvailability = createSelector(
  [calendarData],
  calendar => calendar.availability
);
export const getEvents = createSelector(
  [getAvailability],
  availability => {
    return availability.events;
  }
);
export const getDayAvailability = createSelector(
  [getAvailability],
  availability => {
    return availability.availability;
  }
);
export const getUpdatedAt = createSelector(
  [getAvailability],
  availability => {
    return availability.updatedAt;
  }
);
export const getNewEvents = createSelector(
  [calendarData],
  calendar => calendar.addedAvailability.events
);

export const getUserId = createSelector(
  [userData],
  user => user.id
);
export const getNewBooking = createSelector(
  [bookingsData],
  booking => booking.bookingCreate.days
);
