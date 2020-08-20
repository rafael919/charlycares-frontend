import {
    GET_Landing_PageData_PENDING,
    onGetLandingPageDataSuccess,
    onGetLandingPageDataError,
  } from './action';
  import { takeLatest, fork, call, put } from 'redux-saga/effects';
  import API from './api';
  
  function* getLandingPageData(action) {
    try {
        let shareDataRes;
        console.log(action);
        shareDataRes = yield call(API.getLandingPageData, action.referenceNo, action.target);
        yield put(onGetLandingPageDataSuccess(shareDataRes.data.data));
    } catch (error) {
      yield put(onGetLandingPageDataError(error));
    }
  }
  
  function* getShareDataWatcher(params) {
    yield takeLatest(GET_Landing_PageData_PENDING, getLandingPageData);
  }
  
  export default [fork(getShareDataWatcher)];
  