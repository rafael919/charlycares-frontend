import { ADD_PROMO_CODE_SUCCESS, PROMO_CODE_RESET } from './actions';

const intialState = {
  isCodeValid: false,
  message: '',
  type: '',
};

export default (state = intialState, action) => {
  switch (action.type) {
    case ADD_PROMO_CODE_SUCCESS:
      return {
        ...state,
        isCodeValid: true,
        message: action.payload.message.description,
        type: action.payload.type,
      };
    case PROMO_CODE_RESET:
      return {
        ...state,
        isCodeValid: false,
      };
    default:
      return state;
  }
};
