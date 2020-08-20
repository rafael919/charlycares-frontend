import { combineReducers } from 'redux';
import availabilityReducer from './Availability/reducer';
import notAvailableReducer from './data/reducer';

const calendarReducers = combineReducers({
  availability: availabilityReducer,
  addedAvailability: notAvailableReducer,
});

export default calendarReducers;
