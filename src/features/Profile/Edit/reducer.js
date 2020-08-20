import { UPDATE_STATUS_RESET } from './actions';

const initialState = {
  isProfileUpdated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATUS_RESET:
      return {
        ...state,
        isProfileUpdated: false,
      };
    default:
      return state;
  }
};
