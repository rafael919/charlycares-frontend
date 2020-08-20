import {
  GET_FAVORITES_AND_ACTIVE_BABYSITTING_SUCCESS,
  REMOVE_FAVORITE_ANGEL,
} from './actions';

const initialState = {
  favorites: [],
  activeBabysitting: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVORITES_AND_ACTIVE_BABYSITTING_SUCCESS:
      return {
        favorites: action.favorites,
        activeBabysitting: action.activeBabysitting,
      };

    case REMOVE_FAVORITE_ANGEL:
      return {
        ...state,
        favorites: state.favorites.filter(angel => angel.id !== action.payload),
      };
    default:
      return state;
  }
};
