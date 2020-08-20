import { actionCreatorGenerator } from 'Utils';

export const SET_CURRENT_DATE = 'calendar/notAvailable/setCurrentDate';
export const ADD_REPEAT_DAY = 'calendar/notAvailable/addRepeatDay';
export const ON_ADD_EVENT_PENDING = 'calendar/notAvailable/onAddEventPending';
export const ON_ADD_EVENT_SUCCESS = 'calendar/notAvailable/onAddEventSuccess';
export const ON_ADD_EVENT_ERROR = 'calendar/notAvailable/onAddEventError';
export const ADD_EVENT_SUCCESS = 'calendar/notAvailable/addEventSuccess';
export const ON_ADD_EVENT_SUCCESS_CALENDAR =
  'calendar/availability/addEventCalendarSuccess';
export const ON_GET_WEEK_EVENTS_PENDING =
  'calendar/availability/onGetWeekEventsPending';
export const ON_GET_WEEK_EVENTS_ERROR =
  'calendar/availability/onGetWeekEventsError';
export const ON_GET_WEEK_EVENTS_SUCCESS =
  'calendar/availability/onGetWeekEventsSuccess';

export const ON_REMOVE_EVENT_PENDING = 
  'calendar/availability/onRemoveEventPending'; 
export const ON_REMOVE_EVENT_SUCCESS = 
  'calendar/availability/onRemoveEventSuccess'; 

export const ON_REMOVE_EVENT_EVERYWHERE_PENDING = 
  'calendar/availability/onRemoveEventEverywherePending'; 
export const ON_REMOVE_EVENT_EVERYWHERE_SUCCESS = 
  'calendar/availability/onRemoveEventEverywhereSuccess'; 

export const onSetCurrentDate = actionCreatorGenerator(
  SET_CURRENT_DATE,
  'payload'
);

export const addEventCalendarSuccess = actionCreatorGenerator(
  ON_ADD_EVENT_SUCCESS_CALENDAR,
  'payload'
);

export const onGetWeekEventsPending = actionCreatorGenerator(
  ON_GET_WEEK_EVENTS_PENDING,
  'payload'
);

export const onGetWeekEvents = actionCreatorGenerator(
  ON_GET_WEEK_EVENTS_PENDING,
  'payload'
);

export const onGetWeekEventsError = actionCreatorGenerator(
  ON_GET_WEEK_EVENTS_ERROR,
  'payload'
);

export const onGetWeekEventsSuccess = actionCreatorGenerator(
  ON_GET_WEEK_EVENTS_SUCCESS,
  'payload'
);

export const onAddEventError = actionCreatorGenerator(
  ON_ADD_EVENT_ERROR,
  'payload'
);

export const onAddEvent = actionCreatorGenerator(
  ON_ADD_EVENT_PENDING,
  'payload',
  'callback'
);

export const onRemoveEvent = actionCreatorGenerator(
  ON_REMOVE_EVENT_PENDING,
  'payload',
  'callback'
);

export const onRemoveEventEverywhere = actionCreatorGenerator(
  ON_REMOVE_EVENT_EVERYWHERE_PENDING,
  'payload',
  'callback'
);

export const onRemoveEventEverywhereSuccess = actionCreatorGenerator(
  ON_REMOVE_EVENT_EVERYWHERE_SUCCESS,
  'payload',
);

export const onRemoveEventSuccess = actionCreatorGenerator(
  ON_REMOVE_EVENT_SUCCESS,
  'payload'
);
