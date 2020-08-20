
import compose from 'ramda/es/compose';
import { REHYDRATE } from 'redux-persist/es/constants';
import { getExpirationTime, decodeToken, isTokenValid } from './utils';
import { LOGOUT, LOGIN_SUCCESS, SIGNUP_SUCCESS } from '../actionTypes';
import { onRehydrateSetTokenInHeader } from './actions';

const initialState = {
  token: null,
  expireAt: null,
  isAuthenticated: false,
  hasMembership: null,
  role: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        expireAt: compose(getExpirationTime, decodeToken)(action.payload.token),
        isAuthenticated: true,
        role: action.payload.user.role,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        expireAt: compose(getExpirationTime, decodeToken)(action.payload.token),
        isAuthenticated: true,
        hasMembership: action.payload.has_membership,
        hasCanceledMembership: action.payload.has_canceled_membership,
        hasDownloadedApp: action.payload.has_app,
        role: action.payload.role,
        isAccepted: action.payload.is_accepted,
        isSuspended: action.payload.suspended,
        hasAppointment: action.payload.angelAppointment, 
        hasActiveTimer: action.payload.has_active_timer, 
        isDismissed: action.payload.dismissed, 
        isRetired: action.payload.retired,
      };
    case REHYDRATE:
      const isTokenExistAndValid =
        action.payload && isTokenValid(action.payload.token);
      if (isTokenExistAndValid) {
        onRehydrateSetTokenInHeader(action.payload.token);
      }
      return {
        ...state,
        isAuthenticated: isTokenExistAndValid,
      };

    case LOGOUT:
      return {
        ...state,
        token: null,
        expireAt: null,
        isAuthenticated: false,
        hasMembership: false,
        role: null,
      };

    default:
      return state;
  }
};
