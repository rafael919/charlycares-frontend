import { actionCreatorGenerator } from 'Utils';

export const GET_ANGEL_EVENTS_PENDING =
  'calendar/availability/getAngelEventsPending';
export const GET_ANGEL_EVENTS_SUCCESS =
  'calendar/availability/getAngelEventsSuccess';
export const GET_ANGEL_EVENTS_ERROR =
  'calendar/availability/getAngelEventsError';
export const CLEAR_ANGEL_EVENTS = 'calendar/availability/angelEventsClear';
export const REFETCH_EVENTS = 'calendar/availability/refetch';

export const onGetAngelEvents = actionCreatorGenerator(
  GET_ANGEL_EVENTS_PENDING,
  'startDate',
  'endDate'
);
export const onGetAngelEventsSuccess = actionCreatorGenerator(
  GET_ANGEL_EVENTS_SUCCESS,
  'payload'
);
export const onGetAngelEventsError = actionCreatorGenerator(
  GET_ANGEL_EVENTS_ERROR,
  'errors'
);
export const onClearAngelEvents = actionCreatorGenerator(CLEAR_ANGEL_EVENTS);
export const onRefetchEvents = actionCreatorGenerator(REFETCH_EVENTS);
