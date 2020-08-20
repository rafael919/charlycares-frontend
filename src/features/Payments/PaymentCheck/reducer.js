import { GET_OUTSTANDING_SUCCESS } from './action';

const initalState = {
  payments: null
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_OUTSTANDING_SUCCESS:
      return {
        payments: action.payload,
      };
    default:
      return state;
  }
};
