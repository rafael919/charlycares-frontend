import { GET_InviteData_SUCCESS } from './action';

const initalState = {
  inviteData: null
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_InviteData_SUCCESS:
      return {
        inviteData: action.payload,
      };
    default:
      return state;
  }
};
