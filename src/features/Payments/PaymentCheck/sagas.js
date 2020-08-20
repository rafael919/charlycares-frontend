import {
    GET_OUTSTANDING_PAYMENTS_PENDING,
    onGetoutstandingPaymentsSuccess,
    onGetoutstandingPaymentsError,
  } from './action';
  import { takeLatest, fork, call, put } from 'redux-saga/effects';
  import API from './api';
  
  function* getOutStandingPayments(action) {
    try {
        let paymentsRes;
        paymentsRes = yield call(API.getOuStandingPayments,action.referenceNo);
        yield put(onGetoutstandingPaymentsSuccess(paymentsRes.data.data));
    } catch (error) {
      yield put(onGetoutstandingPaymentsError(error));
    }
  }
  
  function* getPaymentsWatcher(params) {
    yield takeLatest(GET_OUTSTANDING_PAYMENTS_PENDING, getOutStandingPayments);
  }
  
  export default [fork(getPaymentsWatcher)];
  