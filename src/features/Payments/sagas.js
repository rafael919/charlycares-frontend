import detailsSagas from './Details/sagas';
import homeSagas from './Home/sagas';
import angelPaymentsSagas from './AngelPayments/sagas';
import outStandingPaymentsSagas from './PaymentCheck/sagas'

export default [...detailsSagas, ...homeSagas, ...angelPaymentsSagas, ...outStandingPaymentsSagas];
