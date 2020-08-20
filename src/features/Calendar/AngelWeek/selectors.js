import { createSelector } from 'reselect';

const calendarData = state => state.features.calendar;

export const getWeekEvents = createSelector(
  [calendarData],
  calendar => calendar.addedAvailability.weekEvents
);
export const getWeekAvailability = createSelector(
  [calendarData],
  calendar => calendar.addedAvailability.availability
);
export const getAvailability = createSelector(
  [calendarData],
  calendar => calendar.availability
);
export const getUpdatedAt = createSelector(
  [getAvailability],
  availability => {
    return availability.updatedAt;
  }
);
