import { fork, takeLatest, put } from 'redux-saga/effects';
import {
  CANCEL_MEMBERSHIP_PENDING,
  SAVE_MEMBERSHIP_PENDING,
  onSaveMembershipSuccess,
  onSaveMembershipError,
  onCancelMembershipSuccess,
  onCancelMembershipError,
} from './actions';

import {
  onMembershipUpdateSuccess
} from '../../../data/user/actions'; 

import API from './api';

function* onSaveMembership(action) {
  try {
    const { data } = yield(API.saveMembership(action.payload)); 
    yield put(onSaveMembershipSuccess(data.data)); 
    yield put(onMembershipUpdateSuccess(data.data)); 
  } catch (error) {
    yield put(onSaveMembershipError(error));
  }
}

function* onCancelMembership(action) {
  try {
    const { data } = yield(API.cancelMembership(action.payload)); 
    yield put(onCancelMembershipSuccess(data.data)); 
    yield put(onMembershipUpdateSuccess(data.data)); 
  } catch (error) {
    yield put(onCancelMembershipError(error));
  }
}; 


function* onCancelMembershipWatcher() {
  yield takeLatest(CANCEL_MEMBERSHIP_PENDING, onCancelMembership);
}

function* onSaveMembershipWatcher() {
  yield takeLatest(SAVE_MEMBERSHIP_PENDING, onSaveMembership);
}

export default [fork(onCancelMembershipWatcher), fork(onSaveMembershipWatcher)];
