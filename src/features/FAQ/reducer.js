import {
  GET_FAQs_SUCCESS,
} from './actions';

const initialState = {
 
  faqs: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FAQs_SUCCESS:
      return {
        ...state,
        faqs: action.payload,
      };
    default:
      return state;
  }
};
