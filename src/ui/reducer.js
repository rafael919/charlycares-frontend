import {
  SUCCESS,
  ERROR,
  RESET,
  PENDING,
  TIMEOUT,
  INDICATORS_SUCCESS,
  APP_UPDATE,
  APP_UPDATE_CLEAR,
  SET_USER_STATUS,
} from './actions';

const initialState = {
  isLoading: false,
  errors: null,
  newMessages: null,
  pendingBookings: null,
  pendingJobs: null,
  activeTimer: null,
  update: false,
  userStatus: [],
};

const loadingReducer = (state, action) => {
  const isLoadingAction = action.type.endsWith(PENDING);
  const isSuccessOrErrorAction =
    action.type.endsWith(SUCCESS) || action.type.endsWith(ERROR);

  if (isLoadingAction) return true;

  if (isSuccessOrErrorAction) return false;

  return state;
};

const errorReducer = (state, action) => {
  const isLoadingOrResetAction =
    action.type.endsWith(PENDING) || action.type.endsWith(RESET);
  const isErrorAction =
    action.type.endsWith(ERROR) || action.type.endsWith(TIMEOUT);
  if (isLoadingOrResetAction) return null;
  if (isErrorAction) return action.errors;

  return state;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INDICATORS_SUCCESS:
      return {
        ...state,
        newMessages: action.payload.new_messages,
        pendingBookings: action.payload.has_pending_bookings,
        pendingJobs: action.payload.has_pending_jobs,
        activeTimer: action.payload.active_timer,
      };
    case APP_UPDATE:
      return {
        ...state,
        update: true,
      };
    case APP_UPDATE_CLEAR:
      return {
        ...state,
        update: false,
      };
    case SET_USER_STATUS:
      return {
        ...state,
        userStatus: action.payload,
      };
    default:
      return {
        ...state,
        isLoading: loadingReducer(state.isLoading, action),
        errors: errorReducer(state.errors, action),
      };
  }
};
