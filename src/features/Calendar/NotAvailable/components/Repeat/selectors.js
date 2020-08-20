import { createSelector } from 'reselect';

const calendarState = state => state.features.calendar;

export const getCurrentDate = createSelector(
  [calendarState],
  calendar => calendar.notAvailable.currentDate
);
