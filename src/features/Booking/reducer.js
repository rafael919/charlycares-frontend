import { combineReducers } from 'redux';
import bookingCreateReducer from './Create/reducer';
import bookingDataReducer from './data/reducer';
import bookingAngelReducer from '../Angel/reducer';
import bookingFiltersReducer from './Filters/reducer';
import bookingSendReducer from './Send/reducer';

const BookingReducer = combineReducers({
  data: bookingDataReducer,
  bookingCreate: bookingCreateReducer,
  bookingAngel: bookingAngelReducer,
  bookingFilters: bookingFiltersReducer,
  bookingSend: bookingSendReducer,
});

export default BookingReducer;
