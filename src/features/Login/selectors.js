import { createSelector } from 'reselect';

const loginState = state => state.features.login;

export const getLoadingStatus = createSelector(
  loginState,
  login => login.isLoading
);

export const getErrors = createSelector(loginState, login => login.errors);
