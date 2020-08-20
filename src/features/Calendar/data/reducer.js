import {
  SET_CURRENT_DATE,
  ON_ADD_EVENT_SUCCESS_CALENDAR,
  ON_GET_WEEK_EVENTS_SUCCESS,
  ON_REMOVE_EVENT_SUCCESS,
  ON_REMOVE_EVENT_EVERYWHERE_SUCCESS,
} from './actions';

const initialState = {
  currentDate: null,
  repeatedDays: [],
  events: [],
  weekEvents: [],
  availability: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_DATE:
      return {
        ...state,
        currentDate: action.payload,
      };
    case ON_REMOVE_EVENT_SUCCESS:
      return {
        ...state,
        events: [...state.events.filter(event => event.id !== action.payload)],
        weekEvents: [
          ...state.weekEvents.filter(event => event.id !== action.payload),
        ],
      };
    case ON_REMOVE_EVENT_EVERYWHERE_SUCCESS:
      return {
        ...state,
        events: [
          ...state.events.filter(event => event.parent_id !== action.payload),
        ],
        weekEvents: [
          ...state.weekEvents.filter(
            event => event.parent_id !== action.payload
          ),
        ],
      };
    case ON_ADD_EVENT_SUCCESS_CALENDAR:
      return {
        ...state,
        events: [...state.events, action.payload],
        weekEvents: [...state.weekEvents, ...action.payload],
      };
    case ON_GET_WEEK_EVENTS_SUCCESS:
      return {
        ...state,
        weekEvents: action.payload.events,
        availability: action.payload.availability,
      };
    default:
      return state;
  }
};
