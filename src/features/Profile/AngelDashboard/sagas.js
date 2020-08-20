import { fork, takeLatest, call, put } from 'redux-saga/effects';
import {
  GET_DASHBOARD_DATA_PENDING,
  onGetDashboardDataSuccess,
  onGetDashboardDataError,
  RATE_UPDATE_PENDING,
  onRateUpdateSuccess,
  onRateUpdateError,
} from './actions';
import API from './api';

function* getDashboardData() {
  try {
    const messagesRes = yield call(API.getMessages);
    const angelDataRes = yield call(API.getAngelData);
    const referralsRes = yield call(API.getReferrals);

    yield put(
      onGetDashboardDataSuccess(
        angelDataRes.data.data,
        messagesRes.data.data,
        referralsRes.data.data
      )
    );
  } catch (err) {
    yield put(onGetDashboardDataError(err));
  }
}

function* updateRate(action) {
  try {
    yield call(API.updateRates, action.payload);
    yield put(onRateUpdateSuccess());
  } catch (err) {
    yield put(onRateUpdateError(err));
  }
}

function* getDashboardDataWatcher(action) {
  yield takeLatest(GET_DASHBOARD_DATA_PENDING, getDashboardData);
}
function* updateRateWatcher(action) {
  yield takeLatest(RATE_UPDATE_PENDING, updateRate);
}
export default [fork(getDashboardDataWatcher), fork(updateRateWatcher)];
