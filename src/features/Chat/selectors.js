import { createSelector } from 'reselect';

const chatData = state => state.features.chat;
const userData = state => state.data.user;

export const getMessages = createSelector(
  [chatData],
  chat => chat.messages
);
export const getUserId = createSelector(
  [userData],
  user => user.user_id
);
export const getBooks = createSelector(
  [chatData],
  chat => chat.books
);
export const getSentMessage = createSelector(
  [chatData],
  chat => chat.sentMessage
);
