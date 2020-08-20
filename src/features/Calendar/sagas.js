import availabilitySagas from './Availability/sagas';
import addedEventsSagas from './data/sagas';

export default [...availabilitySagas, ...addedEventsSagas];
