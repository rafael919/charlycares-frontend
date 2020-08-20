import { isAngel } from 'Utils';
import { takeLatest, fork, call, put } from 'redux-saga/effects';
import { onGetFAQsSuccess, onGetFAQsError, GET_FAQs_PENDING } from './actions';

import API from './api';
function* getFAQs(action) {
  try {
    let bookings;
    if (isAngel(action.role)) {
      bookings = yield call(API.getAngleSupportFAQs, action.token);
      yield put(onGetFAQsSuccess(bookings.data.data));
    } else {
      bookings = yield call(API.getFamilySupportFAQs, action.token);
      yield put(onGetFAQsSuccess(bookings.data.data));
    }
  } catch (e) {
    yield put(onGetFAQsError(e));
  }
}

function* getFAQsWatcher() {
  yield takeLatest(GET_FAQs_PENDING, getFAQs);
}

export default [fork(getFAQsWatcher)];
