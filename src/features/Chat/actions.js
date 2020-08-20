import { actionCreatorGenerator } from 'Utils';

export const GET_MESSAGES_PENDING = 'chat/getMessagesPending';
export const GET_MESSAGES_SUCCESS = 'chat/getMessagesSuccess';
export const GET_MESSAGES_ERROR = 'chat/getMessagesError';
export const SEND_MESSAGE_PENDING = 'chat/sendMessagePending';
export const SEND_MESSAGE_SUCCESS = 'chat/sendMessageSuccess';
export const SEND_MESSAGE_ERROR = 'chat/sendMessageError';

export const SET_INIT_BOOK = 'chat/setInitBook';
export const CLEAR_BOOK = 'chat/clearBook';
export const CHANGE_BOOK = 'chat/changeBook';
export const ADD_REPEATED_BOOK = 'chat/addRepeatedBook';
export const CLEAR_REPEATED_BOOKS = 'chat/clearRepeatedBooks';

export const onGetMessages = actionCreatorGenerator(
  GET_MESSAGES_PENDING,
  'userId',
  'perPage',
  'page'
);
export const onGetMessagesSuccess = actionCreatorGenerator(
  GET_MESSAGES_SUCCESS,
  'payload'
);
export const onGetMessagesError = actionCreatorGenerator(
  GET_MESSAGES_ERROR,
  'errors'
);

export const onSendMessage = actionCreatorGenerator(
  SEND_MESSAGE_PENDING,
  'payload'
);
export const onSendMessageSuccess = actionCreatorGenerator(
  SEND_MESSAGE_SUCCESS,
  'payload'
);
export const onSendMessageError = actionCreatorGenerator(
  SEND_MESSAGE_ERROR,
  'errors'
);

export const setInitBook = actionCreatorGenerator(SET_INIT_BOOK, 'payload');
export const clearBook = actionCreatorGenerator(CLEAR_BOOK);
export const changeBook = actionCreatorGenerator(CHANGE_BOOK, 'payload');
export const addRepeatedBook = actionCreatorGenerator(
  ADD_REPEATED_BOOK,
  'payload'
);
export const clearRepeatedBooks = actionCreatorGenerator(
  CLEAR_REPEATED_BOOKS,
  'payload'
);
