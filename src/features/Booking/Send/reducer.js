import { CREATE_BOOKING_SUCCESS, MESSAGE_CHANGE } from './actions';

const initialState = {
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOOKING_SUCCESS:
      return {
        message: '',
      };
    case MESSAGE_CHANGE:
      return {
        message: action.payload,
      };
    default:
      return state;
  }
};
