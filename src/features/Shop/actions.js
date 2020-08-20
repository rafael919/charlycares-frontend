import { actionCreatorGenerator } from 'Utils';

export const GET_GIFTS_PENDING = 'shop/getGiftsPending';
export const GET_GIFTS_SUCCESS = 'shop/getGiftsSuccess';
export const GET_GIFTS_ERROR = 'shop/getGiftsError';
export const GET_TRANSACTIONS_PENDING = 'shop/getTransactionsPending';
export const GET_TRANSACTIONS_SUCCESS = 'shop/getTransactionsSuccess';
export const GET_TRANSACTIONS_ERROR = 'shop/getTransactionsError';
export const BUY_GIFT_PENDING = 'shop/buyGiftPending';
export const BUY_GIFT_SUCCESS = 'shop/buyGiftSuccess';
export const BUY_GIFT_ERROR = 'shop/buyGiftError';

export const onGetGifts = actionCreatorGenerator(GET_GIFTS_PENDING);
export const onGetGiftsSuccess = actionCreatorGenerator(
  GET_GIFTS_SUCCESS,
  'payload'
);
export const onGetGiftsError = actionCreatorGenerator(
  GET_GIFTS_ERROR,
  'errors'
);

export const onGetTransactions = actionCreatorGenerator(
  GET_TRANSACTIONS_PENDING
);
export const onGetTransactionsSuccess = actionCreatorGenerator(
  GET_TRANSACTIONS_SUCCESS,
  'payload'
);
export const onGetTransactionsError = actionCreatorGenerator(
  GET_TRANSACTIONS_ERROR,
  'errors'
);

export const onBuyGift = actionCreatorGenerator(BUY_GIFT_PENDING, 'payload');
export const onBuyGiftSuccess = actionCreatorGenerator(
  BUY_GIFT_SUCCESS,
  'payload'
);
export const onBuyGiftError = actionCreatorGenerator(BUY_GIFT_ERROR, 'errors');
