import axios from '../../axios';
import { LOGOUT } from '../actionTypes';

export const onRehydrateSetTokenInHeader = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const onRemoveAuthData = () => ({
  type: LOGOUT,
});

export const onLogout = () => {
  axios.defaults.headers.common['Authorization'] = '';
  return onRemoveAuthData();
};
