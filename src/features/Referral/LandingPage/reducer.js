import { GET_Landing_PageData_SUCCESS } from './action';

const initalState = {
  shareData: null
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_Landing_PageData_SUCCESS:
      return {
        shareData: action.payload,
      };
    default:
      return state;
  }
};
