import { combineReducers } from 'redux';
import creditReducer from './Credit/reducer';
import membershipReducer from './Membership/reducer';
import editProfileReducer from './Edit/reducer';
import angelPreferencesReducer from './AngelPreferences/reducer';
import angelDashboardReducer from './AngelDashboard/reducer';
import familyNotificationsReducer from './Notifications/reducer'; 

const profileReducers = combineReducers({
  credit: creditReducer,
  membership: membershipReducer,
  edit: editProfileReducer,
  preferences: angelPreferencesReducer,
  dashboard: angelDashboardReducer,
  familyNotifications: familyNotificationsReducer,
});

export default profileReducers;
