import { takeLatest, fork, call, put } from 'redux-saga/effects';
import { INDICATORS_PENDING, onGetIndicatorsSuccess } from './actions';

import API from './api';

function* getIndicators(action) {
  try {
    const data = yield call(API.getIndicators);

    yield put(onGetIndicatorsSuccess(data.data.data));
  } catch (e) {
    console.log(e);
  }
}

function* getIndicatorsWatcher() {
  yield takeLatest(INDICATORS_PENDING, getIndicators);
}

export default [fork(getIndicatorsWatcher)];
