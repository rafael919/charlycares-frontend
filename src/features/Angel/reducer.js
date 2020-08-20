import {
  GET_ANGEL_SUCCESS,
  ON_ANGEL_SWIPE_RIGHT,
  ON_ANGEL_SWIPE_LEFT,
  ON_ANGEL_SWIPE_RIGHT_PENDING,
  ON_ANGEL_SWIPE_LEFT_PENDING,
} from './actions';

const intialState = {
  angel: null,
  prevAngel: null,
  nextAngel: null,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case GET_ANGEL_SUCCESS:
      let data = {};
      if (action.payload.current) {
        data.angel = action.payload.current;
      }
      if (action.payload.prev) {
        data.prevAngel = action.payload.prev;
      }
      if (action.payload.next) {
        data.nextAngel = action.payload.next;
      }
      return {
        ...state,
        ...data,
      };
    case ON_ANGEL_SWIPE_RIGHT_PENDING:
      return {
        ...state,
        angel: state.prevAngel,
        nextAngel: state.angel,
      };
    case ON_ANGEL_SWIPE_RIGHT:
      return {
        ...state,
        prevAngel: action.payload,
      };

    case ON_ANGEL_SWIPE_LEFT_PENDING:
      return {
        ...state,
        angel: state.nextAngel,
        prevAngel: state.angel,
      };

    case ON_ANGEL_SWIPE_LEFT:
      return {
        ...state,
        nextAngel: action.payload,
      };
    default:
      return state;
  }
};
