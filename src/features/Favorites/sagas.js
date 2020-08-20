import { takeLatest, fork, put, call } from 'redux-saga/effects';
import {
  GET_FAVORITES_AND_ACTIVE_BABYSITTING_PENDING,
  onGetFavoritesAndActiveBabysittingSuccess,
  onGetFavoritesAndActiveBabysittingError,
} from './actions';
import API from './api';

function* getFavorites() {
  try {
    const favoritesReq = yield call(API.getFavorites);
    const activeSittingReq = yield call(API.getActiveSitting);

    yield put(
      onGetFavoritesAndActiveBabysittingSuccess(
        favoritesReq.data,
        activeSittingReq.data.data
      )
    );
  } catch (err) {
    yield put(onGetFavoritesAndActiveBabysittingError(err));
  }
}

function* getFavoritesWatcher() {
  yield takeLatest(GET_FAVORITES_AND_ACTIVE_BABYSITTING_PENDING, getFavorites);
}

export default [fork(getFavoritesWatcher)];
