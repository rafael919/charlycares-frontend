import { createSelector } from 'reselect';

const favoritesState = state => state.features.favorites;
const userData = state => state.data.user;

export const getFavorites = createSelector(
  favoritesState,
  state => state.favorites
);
export const getActiveBabysitting = createSelector(
  favoritesState,
  state => state.activeBabysitting
);
export const getUserId = createSelector(
  [userData],
  user => user.user_id
);
