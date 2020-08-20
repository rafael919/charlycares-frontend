import { takeLatest, fork, put, call } from 'redux-saga/effects';
import {
  GET_RATES_PENDING,
  onGetRatesSuccess,
  onGetRatesError,
} from './actions';
import API from './api';

function* getRates() {
  try {
    const { data } = yield call(API.getRates);
    yield put(onGetRatesSuccess(data.data.rates));
  } catch (err) {
    yield put(onGetRatesError(err));
  }
}

function* getRatesWatcher() {
  yield takeLatest(GET_RATES_PENDING, getRates);
}

export default [fork(getRatesWatcher)];
