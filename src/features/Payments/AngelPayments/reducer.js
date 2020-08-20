import { GET_ANGEL_PAYMENTS_SUCCESS } from './actions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ANGEL_PAYMENTS_SUCCESS:
      return { ...action.payload };
    default:
      return state;
  }
};
