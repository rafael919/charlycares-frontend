import dataSagas from './data/sagas';
import angelSagas from '../Angel/sagas';
import sendBookingSagas from './Send/sagas';

export default [...dataSagas, ...angelSagas, ...sendBookingSagas];
