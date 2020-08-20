import {
  ANGELS_SEARCH_SUCCESS,
  ON_ANGEL_SELECT,
  GET_BOOKINGS_SUCCESS,
  ON_ANGELS_FILTER,
  SELECTED_ANGELS_RESET,
  GET_ANGELS_FOR_BOOKING_SUCCESS,
  SET_SELECTED_ANGELS,
  ANGELS_SEARCH_PENDING,
  ON_ANGEL_LIKE,
  ON_BOOKING_EDIT,
  EDITED_BOOKING_CLEAR,
  CANCELED_BOOKING_CLEAR,
  ON_BOOKING_CANCEL,
  ANGEL_BOOKING_SET_SELECTED_AND_DESELECTED_DAYS,
  ANGELS_CLEAR,
} from './actions';

const initialState = {
  availableAngels: [],
  filteredAngels: {
    match: [],
    notMatch: [],
    numberOfActiveFilters: 0,
  },
  selectedAngels: [],
  likedAngels: [],
  bookings: null,
  editedBooking: null,
  canceledBooking: null,
  angelSelectedDays: null,
  angelDeselectedDays: null,
  currentAngelBookingId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ANGELS_FOR_BOOKING_SUCCESS:
      return {
        ...state,
        availableAngels: action.payload,
        likedAngels: action.payload.reduce((acc, curr) => {
          if (curr.is_liked) {
            acc.push(curr.id);
          }
          return acc;
        }, []),
      };
    case ANGELS_SEARCH_SUCCESS:
      return {
        ...state,
        availableAngels: action.payload,
        likedAngels: action.payload.reduce((acc, curr) => {
          if (curr.is_liked) {
            acc.push(curr.id);
          }
          return acc;
        }, []),
      };
    case ANGELS_CLEAR:
      return {
        ...state,
        availableAngels: [],
        likedAngels: [],
      };
    case ANGELS_SEARCH_PENDING:
      return {
        ...state,
        availableAngels: [],
      };
    case ON_ANGEL_SELECT:
      return {
        ...state,
        selectedAngels: action.payload,
      };
    case GET_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: action.payload,
      };
    case ON_ANGELS_FILTER:
      return {
        ...state,
        filteredAngels: action.payload,
      };
    case SELECTED_ANGELS_RESET:
      return {
        ...state,
        selectedAngels: [],
      };
    case SET_SELECTED_ANGELS:
      return {
        ...state,
        selectedAngels: action.payload,
      };
    case ON_BOOKING_EDIT:
      return {
        ...state,
        editedBooking: action.payload,
      };
    case ON_BOOKING_CANCEL:
      return {
        ...state,
        canceledBooking: action.payload,
      };
    case EDITED_BOOKING_CLEAR:
      return {
        ...state,
        editedBooking: null,
      };
    case CANCELED_BOOKING_CLEAR:
      return {
        ...state,
        canceledBooking: null,
      };
    case ON_ANGEL_LIKE:
      const isAngelExist = state.likedAngels.find(
        angelId => angelId === action.payload
      );
      if (Boolean(isAngelExist)) {
        return {
          ...state,
          likedAngels: state.likedAngels.filter(
            angel => angel !== action.payload
          ),
        };
      }
      return {
        ...state,
        likedAngels: [...state.likedAngels, action.payload],
      };
    case ANGEL_BOOKING_SET_SELECTED_AND_DESELECTED_DAYS:
      return {
        ...state,
        angelSelectedDays: action.payload.selected
          ? action.payload.selected
          : state.angelSelectedDays,
        angelDeselectedDays: action.payload.deselected
          ? action.payload.deselected
          : state.angelDeselectedDays,
        currentAngelBookingId: action.payload.currentAngelBookingId
          ? action.payload.currentAngelBookingId
          : state.currentAngelBookingId,
      };
    default:
      return state;
  }
};
