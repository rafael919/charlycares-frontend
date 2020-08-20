import { combineReducers } from 'redux';

import shareReducer from './LandingPage/reducer'
import inviteDataReducer from './Send/reducer'
const referralsReducer = combineReducers({
  share: shareReducer,
  invite : inviteDataReducer,
});

export default referralsReducer;
