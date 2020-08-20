import { GET_DASHBOARD_DATA_SUCCESS } from './actions';

const initialState = {
  messages: [],
  angelData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        angelData: {
          ...action.angelData,
          referrals: action.referrals,
        },
        messages: action.messages,
      };
    default:
      return state;
  }
};
