import {
  UPDATE_SETTINGS_PENDING,
  UPDATE_FB_INFO_PENDING,
  onSettingsUpdateError,
  onFBInfoSuccess,
  onFBInfoError,
} from './actions';

import { onUpdateUserProfileDataSuccess } from '../../../data/user/actions';
import { takeLatest, fork, call, put } from 'redux-saga/effects';
import API from './api';
import { generateCommonSaga } from 'Utils';

function* updateSettings(action) {
  try {
    const { data } = yield call(
      API.updateUserProfile,
      action.payload,
      action.role
    );

    yield put(onUpdateUserProfileDataSuccess(data.data));
  } catch (err) {
    yield put(onSettingsUpdateError(err));
  }
}

const setFBInfo = generateCommonSaga(
  API.updateFBInfo,
  onFBInfoSuccess,
  onFBInfoError
);

function* updateSettingsWatcher() {
  yield takeLatest(UPDATE_SETTINGS_PENDING, updateSettings);
}
function* updateFBInfoWatcher() {
  yield takeLatest(UPDATE_FB_INFO_PENDING, setFBInfo);
}

export default [fork(updateSettingsWatcher), fork(updateFBInfoWatcher)];
