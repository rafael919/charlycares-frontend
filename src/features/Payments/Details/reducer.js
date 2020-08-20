import { GET_RATES_SUCCESS } from './actions';

const initialState = {
  rates: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RATES_SUCCESS:
      return {
        rates: action.payload,
      };
    default:
      return state;
  }
};
