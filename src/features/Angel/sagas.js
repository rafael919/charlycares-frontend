import { takeLatest, fork, put, call } from 'redux-saga/effects';
import API from './api';

import {
  onGetAngelFailure,
  onGetAngelSuccess,
  onAngelSwipeRightSuccess,
  onAngelSwipeLeftSuccess,
  GET_ANGEL_PENDING,
  ON_ANGEL_SWIPE_LEFT_PENDING,
  ON_ANGEL_SWIPE_RIGHT_PENDING,
} from './actions';

function* getAngel(action) {
  try {
    const { currentId, nextId, prevId, bookingDates } = action.payload;
    let current, ratings, next, nextRatings, prev, prevRatings;

    if (currentId) {
      current = yield call(API.getAngelSaga, currentId, bookingDates);
      ratings = yield call(API.getRatingsSaga, currentId);
    }
    if (nextId) {
      next = yield call(API.getAngelSaga, nextId, bookingDates);
      nextRatings = yield call(API.getRatingsSaga, nextId);
    }
    if (prevId) {
      prev = yield call(API.getAngelSaga, prevId, bookingDates);
      prevRatings = yield call(API.getRatingsSaga, prevId);
    }
    yield put(
      onGetAngelSuccess({
        current: current
          ? {
              ...current.res.data,
              ratings: ratings.res.data,
            }
          : null,
        next: next
          ? {
              ...next.res.data,
              ratings: nextRatings.res.data,
            }
          : null,
        prev: prev
          ? {
              ...prev.res.data,
              ratings: prevRatings.res.data,
            }
          : null,
      })
    );
  } catch (e) {
    yield onGetAngelFailure(e);
  }
}

function* onSwipeRight(action) {
  try {
    let current = yield call(API.getAngel, action.payload);
    let ratings = yield call(API.getRatings, action.payload);

    yield put(
      onAngelSwipeRightSuccess({
        ...current.res.data,
        ratings: ratings.res.data,
      })
    );
    if (action.callback) {
      action.callback();
    }
  } catch (error) {
    yield onGetAngelFailure(error);
  }
}

function* onSwipeLeft(action) {
  try {
    let current = yield call(API.getAngel, action.payload);
    let ratings = yield call(API.getRatings, action.payload);

    yield put(
      onAngelSwipeLeftSuccess({
        ...current.res.data,
        ratings: ratings.res.data,
      })
    );
    if (action.callback) {
      action.callback();
    }
  } catch (error) {
    yield onGetAngelFailure(error);
  }
}

function* getAngelWatcher() {
  yield takeLatest(GET_ANGEL_PENDING, getAngel);
}
function* swipeRightWatcher() {
  yield takeLatest(ON_ANGEL_SWIPE_RIGHT_PENDING, onSwipeRight);
}
function* swipeLeftWatcher() {
  yield takeLatest(ON_ANGEL_SWIPE_LEFT_PENDING, onSwipeLeft);
}

export default [
  fork(getAngelWatcher),
  fork(swipeLeftWatcher),
  fork(swipeRightWatcher),
];
