import { takeLatest, fork, put } from 'redux-saga/effects';

import API from './api';

import {
  ON_GET_AGENDAS,
  ON_GET_TIMESLOTS,
  MAKE_APPOINTMENT,
  onGetAgendasSuccess,
  onGetAgendasError,
  onGetTimeslotsSuccess,
  onGetTimeslotsError,
  onAppointmentSuccess,
  onAppointmentFailure,
} from './actions';
import { callAPI, actionHandler } from 'Utils';

function* getAgendas() {
  const { api } = yield callAPI(API.getAgendas);
  yield actionHandler({
    apiRes: api,
    prop: 'agendas',
    success: onGetAgendasSuccess,
    error: onGetAgendasError,
  });
}

function* getTimeslots(action) {
  const { api } = yield callAPI(API.getTimeslots, action.id, action.week, action.year);
  yield actionHandler({
    apiRes: api,
    prop: 'week',
    success: [
      put(
        onGetTimeslotsSuccess({
          ...api.res.data,
          timeslots: api.res.data.timeslots,
          showNextWeek: api.res.data.showNextWeek, 
          showPreviousWeek: api.res.data.showPreviousWeek
        })
      ),
    ],
    error: onGetTimeslotsError,
  });
}

function* makeAppointmentForScreening(action) {
  const { api } = yield callAPI(API.makeAppointment, action.payload);

  yield actionHandler({
    apiRes: api,
    customProp: action.payload,
    success: onAppointmentSuccess,
    error: onAppointmentFailure,
  });
}

function* getAgendasWatcher() {
  yield takeLatest(ON_GET_AGENDAS, getAgendas);
}

function* getTimeslotsWatcher() {
  yield takeLatest(ON_GET_TIMESLOTS, getTimeslots);
}

function* makeAppointmentWatcher() {
  yield takeLatest(MAKE_APPOINTMENT, makeAppointmentForScreening);
}

export default [
  fork(getAgendasWatcher),
  fork(getTimeslotsWatcher),
  fork(makeAppointmentWatcher),
];
