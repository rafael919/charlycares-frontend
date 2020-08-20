import { fork, takeLatest, call, put } from 'redux-saga/effects';
import API from './api';
import {
  onGetMessagesSuccess,
  onGetMessagesError,
  GET_MESSAGES_PENDING,
  onSendMessageSuccess,
  onSendMessageError,
  SEND_MESSAGE_PENDING,
} from './actions';

function* getMessages(action) {
  try {
    const { userId, perPage, page } = action;
    const { data } = yield call(API.getMessagesPage, userId, perPage, page);
    yield put(onGetMessagesSuccess(data.data.messages));
  } catch (error) {
    yield put(onGetMessagesError(error));
  }
}

function* sendMessage(action) {
  try {
    const { payload } = action;
    const { data } = yield call(API.sendMessage, payload);
    yield put(onSendMessageSuccess(data));
  } catch (error) {
    yield put(onSendMessageError(error));
  }
}

function* getMessagesWatcher() {
  yield takeLatest(GET_MESSAGES_PENDING, getMessages);
}
function* sendMessageWatcher() {
  yield takeLatest(SEND_MESSAGE_PENDING, sendMessage);
}

export default [fork(getMessagesWatcher), fork(sendMessageWatcher)];
