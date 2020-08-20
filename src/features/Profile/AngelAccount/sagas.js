import { put, fork, takeLatest, call } from 'redux-saga/effects';

import {
  onUpdateProfileError,
  UPDATE_PROFILE_PENDING,
} from './actions';
import API from './api';

import {
  onUpdateUserProfileDataSuccess, 
  onUploadedVideoSuccess,
} from '../../../data/user/actions'; 

function* onProfileUpdate(action) {
  try {
    const { data } = yield call(API.updateAngel, action.payload); 
    yield put(onUpdateUserProfileDataSuccess(data.data)); 

    if (action.payload.video) {
      yield call(API.uploadVideo, action.payload.url, action.payload.video);
      const { data } = yield call(API.videoUploaded);
      yield put(onUploadedVideoSuccess(data.data)); 
    }
  } catch (error) {
    yield put(onUpdateProfileError(error));
  }
}

function* onProfileUpdateWatcher(action) {
  yield takeLatest(UPDATE_PROFILE_PENDING, onProfileUpdate);
}

export default [fork(onProfileUpdateWatcher)];
