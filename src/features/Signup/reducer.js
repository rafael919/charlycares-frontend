import {
  ON_EMAIL_RESET,
  ON_EMAIL_SIGNUP,
  ON_SIGNUP_FLOW_FINISH,
  ON_SIGNUP_FLOW_RESET,
  ON_GET_AGENDAS_SUCCESS,
  ON_AGENDA_SELECT,
  ON_GET_TIMESLOTS_SUCCESS,
  ON_TIMESLOT_SELECT,
  MAKE_APPOINTMENT_SUCCESS,
  ON_FACEBOOK_SIGNUP_SUCCESS,
  MAKE_APPOINTMENT,
} from './actions';

const initialState = {
  isLoading: false,
  errors: null,
  withEmail: false,
  facebookData: null,
  isSignupFlowFinished: false,
  agendas: null,
  selectedAgenda: null,
  timeslots: null,
  selectedTimeslot: null,
  confirmedTimeslot: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MAKE_APPOINTMENT:
      return {
        ...state,
        confirmedTimeslot: null,
      };
    case ON_EMAIL_SIGNUP:
      return {
        ...state,
        withEmail: true,
      };
    case ON_FACEBOOK_SIGNUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        facebookData: action.payload,
      };
    }
    case ON_EMAIL_RESET:
      return {
        ...state,
        withEmail: false,
        facebookData: null,
      };
    case ON_SIGNUP_FLOW_FINISH:
      return {
        ...state,
        isSignupFlowFinished: true,
      };
    case ON_SIGNUP_FLOW_RESET:
      return {
        ...state,
        isSignupFlowFinished: false,
      };
    case ON_GET_AGENDAS_SUCCESS:
      return {
        ...state,
        agendas: action.payload,
        isLoading: false,
      };
    case ON_AGENDA_SELECT:
      return {
        ...state,
        selectedAgenda: action.payload,
      };
    case ON_GET_TIMESLOTS_SUCCESS:
      return {
        ...state,
        week: action.payload,
        isLoading: false,
      };
    case ON_TIMESLOT_SELECT:
      return {
        ...state,
        selectedTimeslot: action.payload,
      };
    case MAKE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        confirmedTimeslot: action.payload,
      };
    default:
      return state;
  }
};
