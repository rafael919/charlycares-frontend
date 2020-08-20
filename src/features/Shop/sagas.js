import { takeLatest, fork, call, put } from 'redux-saga/effects';
import {
  GET_GIFTS_PENDING,
  onGetGiftsSuccess,
  onGetGiftsError,
  GET_TRANSACTIONS_PENDING,
  onGetTransactionsSuccess,
  onGetTransactionsError,
  BUY_GIFT_PENDING,
  onBuyGiftSuccess,
  onBuyGiftError,
} from './actions';
import API from './api';

function* getGifts() {
  try {
    let giftsRes = yield call(API.getGifts);
    yield put(onGetGiftsSuccess(giftsRes.data));
  } catch (error) {
    yield put(onGetGiftsError(error));
  }
}

function* getTransactions() {
  try {
    let getTransactionsRes = yield call(API.getTransactions);
    yield put(onGetTransactionsSuccess(getTransactionsRes.data));
  } catch (error) {
    yield put(onGetTransactionsError(error));
  }
}

function* buyGift(action) {
  try {
    const { payload } = action;
    const { data } = yield call(API.buyGift, payload);
    yield put(onBuyGiftSuccess(data));
  } catch (error) {
    yield put(onBuyGiftError(error));
  }
}

function* getGiftsWatcher(params) {
  yield takeLatest(GET_GIFTS_PENDING, getGifts);
}

function* getTransactionsWatcher(params) {
  yield takeLatest(GET_TRANSACTIONS_PENDING, getTransactions);
}

function* buyGiftWatcher() {
  yield takeLatest(BUY_GIFT_PENDING, buyGift);
}

export default [
  fork(getGiftsWatcher),
  fork(getTransactionsWatcher),
  fork(buyGiftWatcher),
];
