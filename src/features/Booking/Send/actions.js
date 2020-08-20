import { actionCreatorGenerator } from 'Utils';

export const CREATE_BOOKING_PENDING = 'booking/send/sendPending';
export const CREATE_BOOKING_ERROR = 'booking/send/sendError';
export const CREATE_BOOKING_SUCCESS = 'booking/send/sendSuccess';
export const MESSAGE_CHANGE = 'booking/send/messageChange';

export const onCreateBooking = actionCreatorGenerator(
  CREATE_BOOKING_PENDING,
  'payload',
  'history',
  'hasMembership',
  'hasCanceledMembership'
);

export const onCreateError = actionCreatorGenerator(
  CREATE_BOOKING_ERROR,
  'errors'
);

export const onCreateSuccess = (history, hasMembership, hasCanceledMembership) => { 
  if(hasCanceledMembership === true) {
    history.replace('/reactivate/step-2');
  }
  else if(hasMembership === false) {
    history.replace('/how-it-works-trial');
  } else {
    history.replace('/booking', {from: 'booking/send'}); 
  }

  return {
    type: CREATE_BOOKING_SUCCESS,
  };
};

export const onMessageChange = actionCreatorGenerator(
  MESSAGE_CHANGE,
  'payload'
);
