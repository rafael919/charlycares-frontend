import { GET_FAMILIES_SUCCESS, GET_FAMILY_PROFILE_SUCCESS } from './actions';

const initialState = {
  families: [],
  familyProfile: null,
  activeSitting: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FAMILIES_SUCCESS:
      return {
        ...state,
        families: action.families,
        activeSitting: action.activeSitting,
      };
    case GET_FAMILY_PROFILE_SUCCESS:
      return {
        ...state,
        familyProfile: action.payload,
      };
    default:
      return state;
  }
};
