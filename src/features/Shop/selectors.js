import { createSelector } from 'reselect';

const shopState = state => state.features.shop;
const userData = state => state.data.user;

export const getGifts = createSelector(
  shopState,
  state => state.gifts
);

export const getAvailablePoints = createSelector(
  shopState,
  state => state.availablePoints
);

export const getPurchaseCount = createSelector(
  shopState,
  state => state.purchaseCount
);

export const getTransactions = createSelector(
  shopState,
  state => state.transactions
);

export const getBuyState = createSelector(
  shopState,
  state => state.buySuccess
);

export const getUserId = createSelector(
  [userData],
  user => user.user_id
);
