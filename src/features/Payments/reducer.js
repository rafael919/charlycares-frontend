import { combineReducers } from 'redux';
import detailsReducer from './Details/reducer';
import homeReducer from './Home/reducer';
import angelPaymentsReducer from './AngelPayments/reducer';
import outStandingPaymentsReducer from './PaymentCheck/reducer';

const paymentsReducer = combineReducers({
  details: detailsReducer,
  home: homeReducer,
  angelPayments: angelPaymentsReducer,
  outStandingPayments : outStandingPaymentsReducer,
});

export default paymentsReducer;
