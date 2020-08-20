import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import featuresReducer from './features/reducer';
import dataReducer from './data/reducer';
import uiReducer from './ui/reducer';
import dataSagas from './data/sagas';
import featuresSagas from './features/sagas';
import uiSagas from './ui/sagas';

export const rootReducer = combineReducers({
  features: featuresReducer,
  data: dataReducer,
  ui: uiReducer,
});

export function* rootSaga() {
  yield all([...dataSagas, ...featuresSagas, ...uiSagas]);
}
