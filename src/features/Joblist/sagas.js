import { takeLatest, fork, put, call } from 'redux-saga/effects';
import {
  GET_LISTINGS_PENDING,
  onGetListingsSuccess,
  onGetListingsError,
  ANGEL_JOB_ACCEPT_PENDING,
  onAngelAcceptJobSuccess,
  onAngelAcceptJobError,
} from './actions';
import API from './api';

function* getListings() {
  try {
    const listingsReq = yield call(API.getListings);

    yield put(
      onGetListingsSuccess(
        listingsReq.data.data,
      )
    );
  } catch (err) {
    yield put(onGetListingsError(err));
  }
}

function* angelAcceptJob(action) {
  try {
    const data = yield call(API.angelAcceptJob, action.payload);
    if (data) {
      yield put(onAngelAcceptJobSuccess());
      action.history.push('/booking');
    }
  } catch (e) {
    yield put(onAngelAcceptJobError(e));
  }
}

function* getListingsWatcher() {
  yield takeLatest(GET_LISTINGS_PENDING, getListings);
}

function* getAngelAcceptJobWatcher() {
  yield takeLatest(ANGEL_JOB_ACCEPT_PENDING, angelAcceptJob);
}

export default [fork(getListingsWatcher), fork(getAngelAcceptJobWatcher)];
