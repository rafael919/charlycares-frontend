import { fork, takeLatest, call, put } from 'redux-saga/effects';
import {
  GET_DASHBOARD_DATA_PENDING,
  onGetDashboardDataSuccess,
  onGetDashboardDataError,
} from './actions';
import API from './api';

function* getDashboardData() {
  try {
    const messagesRes = yield call(API.getMessages);

    yield put(
      onGetDashboardDataSuccess(
        messagesRes.data.data
      )
    );
  } catch (err) {
    yield put(onGetDashboardDataError(err));
  }
}

function* getDashboardDataWatcher(action) {
  yield takeLatest(GET_DASHBOARD_DATA_PENDING, getDashboardData);
}


export default [fork(getDashboardDataWatcher)];
