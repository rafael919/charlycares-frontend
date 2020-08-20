import { takeLatest, fork, put, call } from 'redux-saga/effects';

import {
  CREATE_BOOKING_PENDING,
  onCreateSuccess,
  onCreateError,
} from './actions';
import { clearSelectedAngels } from '../data/actions';
import { onClearDays } from '../Create/actions';
import API from './api';

function* createBooking(action) {
  console.log(action);
  try {
    const res = yield call(API.createBooking, action.payload);
    if (res.status === 200) {
      yield put(onCreateSuccess(action.history, action.hasMembership, action.hasCanceledMembership));
      yield put(clearSelectedAngels());
      yield put(onClearDays());
    }
  } catch (err) {
    yield put(onCreateError(err));
  }
}

function* createBookingWatcher() {
  yield takeLatest(CREATE_BOOKING_PENDING, createBooking);
}

export default [fork(createBookingWatcher)];
