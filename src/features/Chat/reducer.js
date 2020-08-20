import {
  GET_MESSAGES_SUCCESS,
  SEND_MESSAGE_PENDING,
  SEND_MESSAGE_SUCCESS,
  SET_INIT_BOOK,
  CLEAR_BOOK,
  CHANGE_BOOK,
  ADD_REPEATED_BOOK,
  CLEAR_REPEATED_BOOKS,
} from './actions';

const initialState = {
  messages: null,
  books: [],
  sentMessage: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload,
      };
    case SEND_MESSAGE_PENDING:
      return {
        ...state,
        sentMessage: undefined,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        sentMessage: action.payload,
      };
    case SET_INIT_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case CLEAR_BOOK:
      return {
        ...state,
        books: [],
      };
    case CHANGE_BOOK:
      return {
        ...state,
        books: action.payload,
      };
    case ADD_REPEATED_BOOK:
      return {
        ...state,
        books: action.payload,
      };
    case CLEAR_REPEATED_BOOKS:
      return {
        ...state,
        books: action.payload,
      };

    default:
      return state;
  }
};
