import { GET_PAYMENTS_SUCCESS } from './action';

const initalState = {
  payments: [],
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_PAYMENTS_SUCCESS:
      return {
        payments: action.payload,
      };
    default:
      return state;
  }
};
