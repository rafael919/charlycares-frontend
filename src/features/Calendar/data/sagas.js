import { takeLatest, fork, call, put } from 'redux-saga/effects';
import {
  ON_ADD_EVENT_PENDING,
  ON_GET_WEEK_EVENTS_PENDING,
  addEventCalendarSuccess,
  onGetWeekEventsSuccess,
  onGetWeekEventsError,
  onAddEventError,
  ON_REMOVE_EVENT_PENDING,
  onRemoveEventSuccess,
  ON_REMOVE_EVENT_EVERYWHERE_PENDING,
  onRemoveEventEverywhereSuccess,
} from './actions';

import API from './api';

function* addEvent(action) {
  try {
    const { data } = yield call(API.createEvent, action.payload);
    yield put(addEventCalendarSuccess(data.data));
    action.callback();
  } catch (error) {
    yield put(onAddEventError(error));
  }
}

function* removeEvent(action) {
  try {
    yield call(API.deleteEvent, action.payload);
    yield put(onRemoveEventSuccess(action.payload));
    action.callback();
  } catch (error) {
    yield put(onAddEventError(error));
  }
}

function* removeEventEverywhere(action) {
  try {
    yield call(API.deleteEventEverywhere, action.payload);
    yield put(onRemoveEventEverywhereSuccess(action.payload));
    action.callback();
  } catch (error) {
    yield put(onAddEventError(error));
  }
}

function* getWeekEvents(action) {
  try {
    const { data } = yield call(API.getWeekEvents, action.payload);

    yield put(onGetWeekEventsSuccess(data.data));
  } catch (error) {
    yield put(onGetWeekEventsError(error));
  }
}

function* addEventWatcher() {
  yield takeLatest(ON_ADD_EVENT_PENDING, addEvent);
}

function* removeEventWatcher() {
  yield takeLatest(ON_REMOVE_EVENT_PENDING, removeEvent);
}
function* removeEventEverywhereWatcher() {
  yield takeLatest(ON_REMOVE_EVENT_EVERYWHERE_PENDING, removeEventEverywhere);
}

function* getWeekEventsWatcher() {
  yield takeLatest(ON_GET_WEEK_EVENTS_PENDING, getWeekEvents);
}

export default [
  fork(addEventWatcher),
  fork(getWeekEventsWatcher),
  fork(removeEventWatcher),
  fork(removeEventEverywhereWatcher),
];
