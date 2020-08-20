import { put, fork, takeLatest, call } from 'redux-saga/effects';

import {
  UPDATE_PROFILE_PENDING,
  onUpdateProfileError,
  onUpdateProfileSuccess,
} from './actions';

import { onUpdateUserProfileDataSuccess } from '../../../data/user/actions';

import API from './api';

function* onProfileUpdate(action) {
  console.log(action);
  try {
    if (action.payload.image) {
      yield call(API.updateFamilyImage, action.payload.image);
      yield put(onUpdateProfileSuccess());
    }
    const { data } = yield call(API.updateProfile, action.payload, action.role);
    yield put(onUpdateUserProfileDataSuccess(data.data));
  } catch (error) {
    yield put(onUpdateProfileError(error));
  }
}

function* onProfileUpdateWatcher(action) {
  yield takeLatest(UPDATE_PROFILE_PENDING, onProfileUpdate);
}

export default [fork(onProfileUpdateWatcher)];
