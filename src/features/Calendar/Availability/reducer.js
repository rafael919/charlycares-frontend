import {
  GET_ANGEL_EVENTS_SUCCESS,
  CLEAR_ANGEL_EVENTS,
  REFETCH_EVENTS,
} from './actions';
import {
  ON_ADD_EVENT_SUCCESS_CALENDAR,
  ON_REMOVE_EVENT_SUCCESS,
  ON_REMOVE_EVENT_EVERYWHERE_SUCCESS,
} from '../data/actions';
const initialState = {
  events: [],
  availability: [],
  updatedAt: Date.now(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ANGEL_EVENTS_SUCCESS:
      return {
        ...state,
        events: [...state.events, ...action.payload.events],
        availability: action.payload.availability,
      };
    case ON_ADD_EVENT_SUCCESS_CALENDAR:
      return {
        ...state,
        events: [...state.events, ...action.payload],
      };
    case ON_REMOVE_EVENT_SUCCESS:
      return {
        ...state,
        events: [...state.events.filter(event => event.id !== action.payload)],
      };
    case ON_REMOVE_EVENT_EVERYWHERE_SUCCESS:
      return {
        ...state,
        events: [
          ...state.events.filter(event => event.parent_id !== action.payload),
        ],
      };
    case CLEAR_ANGEL_EVENTS:
      return {
        ...state,
        events: [],
        availability: [],
      };
    case REFETCH_EVENTS:
      return {
        ...state,
        updatedAt: Date.now(),
      };
    default:
      return state;
  }
};
