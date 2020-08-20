import { fork, takeLatest } from 'redux-saga/effects';
import { generateCommonSaga } from 'Utils';
import {
  CANCEL_MEMBERSHIP_PENDING,
  SAVE_MEMBERSHIP_PENDING,
  onSaveMembershipSuccess,
  onSaveMembershipError,
  onCancelMembershipSuccess,
  onCancelMembershipError,
} from './actions';
import API from './api';

const onCancelMembership = generateCommonSaga(
  API.cancelMembership,
  onCancelMembershipSuccess,
  onCancelMembershipError
);
const onSaveMembership = generateCommonSaga(
  API.saveMembership,
  onSaveMembershipSuccess,
  onSaveMembershipError
);

function* onCancelMembershipWatcher() {
  yield takeLatest(CANCEL_MEMBERSHIP_PENDING, onCancelMembership);
}

function* onSaveMembershipWatcher() {
  yield takeLatest(SAVE_MEMBERSHIP_PENDING, onSaveMembership);
}

export default [fork(onCancelMembershipWatcher), fork(onSaveMembershipWatcher)];
