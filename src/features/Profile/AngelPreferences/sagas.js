import {
  GET_PREFERENCES_PENDING,
  PREFERENCES_UPDATE_PENDING,
  onUpdatePreferencesSuccess,
  onUpdatePreferencesError,
  onGetPreferencesSuccess,
  onGetPreferencesError,
} from './actions';
import { generateCommonSaga } from 'Utils';
import { takeLatest, fork } from 'redux-saga/effects';

import API from './api';

const getPreferences = generateCommonSaga(
  API.getPreferences,
  onGetPreferencesSuccess,
  onGetPreferencesError,
  ['data']
);
const updatePreferences = generateCommonSaga(
  API.updatePreferences,
  onUpdatePreferencesSuccess,
  onUpdatePreferencesError,
  ['data']
);

function* getPreferencesWatcher() {
  yield takeLatest(GET_PREFERENCES_PENDING, getPreferences);
}
function* updatePreferencesWatcher() {
  yield takeLatest(PREFERENCES_UPDATE_PENDING, updatePreferences);
}

export default [fork(getPreferencesWatcher), fork(updatePreferencesWatcher)];
