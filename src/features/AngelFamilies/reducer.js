import { combineReducers } from 'redux';
import dataReducer from './data/reducer';

const angelFamiliesReducer = combineReducers({
  data: dataReducer,
});

export default angelFamiliesReducer;
