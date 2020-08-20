import userReducer from './user/reducer';
import authReducer from './auth/reducer';

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'charly-cares:auth',
  storage,
  blacklist: ['isAuthenticated'],
};

const userPersistConfig = {
  key: 'charly-cares:user',
  storage,
};

const dataReducers = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  auth: persistReducer(authPersistConfig, authReducer),
});

export default dataReducers;
