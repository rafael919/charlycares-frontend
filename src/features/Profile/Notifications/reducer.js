import { GET_DASHBOARD_DATA_SUCCESS } from './actions';

const initialState = {
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return state;
  }
};
