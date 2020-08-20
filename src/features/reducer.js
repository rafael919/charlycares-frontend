import { combineReducers } from 'redux';
import signupReducer from './Signup/reducer';
import bookingReducer from './Booking/reducer';
import loginReducer from './Login/reducer';
import favoritesReducer from './Favorites/reducer';
import joblistReducer from './Joblist/reducer';
import paymentsReducer from './Payments/reducer';
import profileReducer from './Profile/reducer';
import chatReducer from './Chat/reducer';
import calendarReducer from './Calendar/reducer';
import angelFamiliesReducer from './AngelFamilies/reducer';
import referralReducer from './Referral/reducer';
import faqReducer from './FAQ/reducer';
import shopReducer from './Shop/reducer';

const featuresReducer = combineReducers({
  signup: signupReducer,
  booking: bookingReducer,
  login: loginReducer,
  favorites: favoritesReducer,
  listings: joblistReducer,
  payments: paymentsReducer,
  profile: profileReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  families: angelFamiliesReducer,
  referrals: referralReducer,
  faq: faqReducer,
  shop: shopReducer,
});

export default featuresReducer;
