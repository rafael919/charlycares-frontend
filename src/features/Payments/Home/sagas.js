import {
  GET_PAYMENTS_PENDING,
  onGetPaymentsSuccess,
  onGetPaymentsError,
} from './action';
import { takeLatest, fork, call, put } from 'redux-saga/effects';
import API from './api';

function* getPayments(action) {
  try {
    let paymentsRes;
    if (action.role === 'family') {
      paymentsRes = yield call(API.getPayments);
    } else {
      paymentsRes = yield call(API.getAngelPayments);
    }
    yield put(onGetPaymentsSuccess(paymentsRes.data.data.payments));
  } catch (error) {
    yield put(onGetPaymentsError(error));
  }
}

function* getPaymentsWatcher(params) {
  yield takeLatest(GET_PAYMENTS_PENDING, getPayments);
}

export default [fork(getPaymentsWatcher)];
