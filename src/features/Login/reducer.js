import { LOGIN_SUCCESS } from '../../data/actionTypes';
import { LOGIN_FAILURE, LOGIN_REQ } from '../../data/user/actions';

const intialState = {
  isLoading: false,
  errors: null,
};

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case LOGIN_REQ:
      return true;
    case LOGIN_SUCCESS:
    case LOGIN_FAILURE:
      return false;
    default:
      return state;
  }
};

const errorReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_REQ:
      return null;
    case LOGIN_FAILURE:
      return action.errors;
    default:
      return state;
  }
};

export default (state = intialState, action) => {
  switch (action.type) {
    default:
      return {
        isLoading: loadingReducer(state.isLoading, action),
        errors: errorReducer(state.error, action),
      };
  }
};
