import { actionCreatorGenerator } from 'Utils';

export const GET_FAVORITES_AND_ACTIVE_BABYSITTING_PENDING =
  'favorites/getFavoritesAndActiveBabysittingPending';
export const GET_FAVORITES_AND_ACTIVE_BABYSITTING_SUCCESS =
  'favorites/getFavoritesAndActiveBabysittingSuccess';
export const GET_FAVORITES_AND_ACTIVE_BABYSITTING_ERROR =
  'favorites/getFavoritesAndActiveBabysittingError';
export const REMOVE_FAVORITE_ANGEL = 'favorites/removeAngel';

export const onGetFavoritesAndActiveBabysitting = actionCreatorGenerator(
  GET_FAVORITES_AND_ACTIVE_BABYSITTING_PENDING
);
export const onGetFavoritesAndActiveBabysittingSuccess = actionCreatorGenerator(
  GET_FAVORITES_AND_ACTIVE_BABYSITTING_SUCCESS,
  'favorites',
  'activeBabysitting'
);
export const onGetFavoritesAndActiveBabysittingError = actionCreatorGenerator(
  GET_FAVORITES_AND_ACTIVE_BABYSITTING_ERROR,
  'errors'
);
export const onRemoveFavoriteAngel = actionCreatorGenerator(
  REMOVE_FAVORITE_ANGEL,
  'payload'
);
