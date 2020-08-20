import { GET_LISTINGS_SUCCESS } from './actions';

const initialState = {
  listings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTINGS_SUCCESS:
      return {
        listings: action.listings
      };
    default:
      return state;
  }
};
