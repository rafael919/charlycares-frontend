import {
  GET_ANGEL_PAYMENTS_PENDING,
  onGetAngelPaymentsSuccess,
  onGetAngelPaymentsError,
} from './actions';
import { takeLatest, fork } from 'redux-saga/effects';
import { generateCommonSaga } from 'Utils';
import API from './api';

const getPayments = generateCommonSaga(
  API.getPayments,
  onGetAngelPaymentsSuccess,
  onGetAngelPaymentsError,
  ['data']
);

function* getPaymentsWatcher(params) {
  yield takeLatest(GET_ANGEL_PAYMENTS_PENDING, getPayments);
}

export default [fork(getPaymentsWatcher)];
