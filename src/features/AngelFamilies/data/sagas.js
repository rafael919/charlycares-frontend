import { generateCommonSaga } from 'Utils';
import { takeLatest, fork, call, put } from 'redux-saga/effects';
import {
  onGetFamiliesSuccess,
  onGetFamiliesError,
  GET_FAMILIES_PENDING,
  GET_FAMILY_PROFILE_PENDING,
  onGetFamilyProfileSuccess,
  onGetFamilyProfileError,
} from './actions';
import API from './api';

function* getFamilies(action) {
  try {
    const families = yield call(API.getFamilies);
    const activeSitting = yield call(API.getActiveSitting);
    yield put(onGetFamiliesSuccess(families.data, activeSitting.data.data));
  } catch (err) {
    yield put(onGetFamiliesError(err));
  }
}

const getFamilyProfile = generateCommonSaga(
  API.getFamilyProfile,
  onGetFamilyProfileSuccess,
  onGetFamilyProfileError,
  ['data']
);

function* getFamiliesWatcher() {
  yield takeLatest(GET_FAMILIES_PENDING, getFamilies);
}
function* getFamilyProfileWatcher() {
  yield takeLatest(GET_FAMILY_PROFILE_PENDING, getFamilyProfile);
}

export default [fork(getFamiliesWatcher), fork(getFamilyProfileWatcher)];
