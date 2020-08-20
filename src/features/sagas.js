import signupSagas from './Signup/sagas';
import bookingSagas from './Booking/sagas';
import favoritesSagas from './Favorites/sagas';
import joblistingsSagas from './Joblist/sagas';
import paymentsSagas from './Payments/sagas';
import profileSagas from './Profile/sagas';
import chatSagas from './Chat/sagas';
import calendarSagas from './Calendar/sagas';
import angelFamiliesSagas from './AngelFamilies/sagas';
import faqSagas from './FAQ/sagas';
import referralSagas from './Referral/sagas';
import shopSagas from './Shop/sagas';

export default [
  ...signupSagas,
  ...bookingSagas,
  ...favoritesSagas,
  ...joblistingsSagas,
  ...paymentsSagas,
  ...profileSagas,
  ...chatSagas,
  ...calendarSagas,
  ...angelFamiliesSagas,
  ...faqSagas,
  ...referralSagas,
  ...shopSagas,
];
