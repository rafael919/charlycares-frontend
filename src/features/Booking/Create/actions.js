import { actionCreatorGenerator } from 'Utils';
export const ON_ADD_DAY = 'booking/create/addDay';
export const ON_CLEAR_DAYS = 'booking/create/clearDays';
export const ON_RESERVATION_CHANGE = 'booking/create/reservationChange';
export const ON_ADDRESS_SELECT = 'booking/create/addressSelect';
export const ON_CHILD_SELECT = 'booking/create/childSelect';
export const ADD_REPEATED_DAY = 'booking/create/repeat/addRepeatedDay';
export const CLEAR_REPEATED_DAYS = 'booking/create/repeat/clearRepeatedDays';
export const REMOVE_DAY = 'booking/create/removeDay';

export const onAddDay = actionCreatorGenerator(ON_ADD_DAY);
export const onClearDays = actionCreatorGenerator(ON_CLEAR_DAYS);
export const onDayFieldChange = actionCreatorGenerator(
  ON_RESERVATION_CHANGE,
  'payload'
);

export const addRepeatedDay = actionCreatorGenerator(
  ADD_REPEATED_DAY,
  'payload'
);

export const onDeleteDay = actionCreatorGenerator(REMOVE_DAY, 'payload');

export const clearRepeatedDays = actionCreatorGenerator(
  CLEAR_REPEATED_DAYS,
  'payload'
);
