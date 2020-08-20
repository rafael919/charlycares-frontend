import {
    GET_InviteData_PENDING,
    onGetInviteDataSuccess,
    onGetInviteDataError,
  } from './action';
  import { takeLatest, fork, call, put } from 'redux-saga/effects';
  import API from './api';
  
  function* getInviteData(action) {
    try {
        let inviteDataRes;
        inviteDataRes = yield call(API.getInviteData,action.userID);
        yield put(onGetInviteDataSuccess(inviteDataRes.data.data));
    } catch (error) {
      yield put(onGetInviteDataError(error));
    }
  }
  
  function* getInviteDataWatcher(params) {
    yield takeLatest(GET_InviteData_PENDING, getInviteData);
  }
  
  export default [fork(getInviteDataWatcher)];
  