import { takeEvery, fork, call, put } from 'redux-saga/effects';
import {
  GET_ANGEL_EVENTS_PENDING,
  onGetAngelEventsSuccess,
  onGetAngelEventsError,
} from './actions';
import API from './api';

function* getEvents(action) {
  try {
    const { data } = yield call(
      API.getEvents,
      action.startDate,
      action.endDate
    );
    yield put(onGetAngelEventsSuccess(data.data));
  } catch (error) {
    yield put(onGetAngelEventsError(error));
  }
}

function* getEventsWatcher() {
  yield takeEvery(GET_ANGEL_EVENTS_PENDING, getEvents);
}

export default [fork(getEventsWatcher)];
