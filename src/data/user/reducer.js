import { LOGOUT, SIGNUP_SUCCESS, LOGIN_SUCCESS } from '../actionTypes';
import {
  GET_USER_PROFILE_DATA_SUCCESS,
  GET_PROFILE_SUCCESS,
  SET_IMAGE,
  UPDATE_PROFILE_DATA_SUCCESS,
  ON_USER_ADD_CREDIT,
  ON_MEMBERSHIP_UPDATE_SUCCESS,
  ON_ANGEL_VIDEO_REMOVE_SUCCESS,
  UPLOADED_VIDEO_SUCCESS,
} from './actions';
import omit from 'ramda/es/omit';

const initialState = {
  profile: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      if (action.payload.token) {
        try {
          let parameters = {
            isLoggedIn: true,
            sessionToken: action.payload.token,
          };
          window.webkit.messageHandlers.iOS.postMessage(parameters);
        } catch (err) {
          if (typeof window.Android !== 'undefined') {
            window.Android.isLoggedIn(action.payload.token);
          }
        }
      }

      return {
        ...state,
        ...action.payload.user,
      };
    case LOGIN_SUCCESS:
      if (action.payload.token) {
        try {
          let params = {
            isLoggedIn: true,
            sessionToken: action.payload.token,
          };
          window.webkit.messageHandlers.iOS.postMessage(params);
        } catch (err) {
          if (typeof window.Android !== 'undefined') {
            window.Android.isLoggedIn(action.payload.token);
          }
        }
      }
      return {
        ...state,
        ...omit(['token', 'role'], action.payload),
      };
    case GET_USER_PROFILE_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...action.payload.profile,
        },
      };
    case UPDATE_PROFILE_DATA_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload.profile,
          languages: action.payload.languages,
        },
        settings: { ...state.settings, ...action.payload.settings },
      };
    case ON_USER_ADD_CREDIT:
      return {
        ...state,
        profile: {
          ...state.profile,
          credit: action.payload.credit,
        },
      };
    case ON_MEMBERSHIP_UPDATE_SUCCESS:
      return {
        ...state,
        membershipData: { ...state.membershipData, ...action.payload },
      };
    case LOGOUT:
      return {};

    case SET_IMAGE:
      return {
        ...state,
        profile: {
          ...state.profile,
          image: action.payload,
        },
      };
    case ON_ANGEL_VIDEO_REMOVE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          angel: {
            ...state.profile.angel,
            video: null,
          },
        },
      };
    case UPLOADED_VIDEO_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          angel: {
            ...state.profile.angel,
            video: action.payload,
          },
        },
      };

    default:
      return state;
  }
};
