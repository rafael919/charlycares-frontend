import {
  CANCEL_MEMBERSHIP_SUCCESS,
  CANCEL_MEMBERSHIP_RESET,
  SAVE_MEMBERSHIP_SUCCESS,
  SAVE_MEMBERSHIP_RESET,
} from './actions';

const initialState = {
  isMembershipCanceled: false,
  isMembershipUpdated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CANCEL_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        isMembershipCanceled: true,
      };
    case CANCEL_MEMBERSHIP_RESET:
      return {
        ...state,
        isMembershipCanceled: false,
      };
    case SAVE_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        isMembershipUpdated: true,
      };
    case SAVE_MEMBERSHIP_RESET:
      return {
        ...state,
        isMembershipUpdated: false,
      };
    default:
      return state;
  }
};
