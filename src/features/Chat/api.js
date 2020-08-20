import axios from '../../axios';

export default {
  getMessages(userId) {
    return axios.get('/messages/' + userId);
  },
  getMessagesPage(userId, perPage, page) {
    return axios.get(`/messages/${userId}/${perPage}?page=${page}`);
  },
  sendMessage(data) {
    return axios.post('/message', data);
  },
  cancelBook(id, data) {
    return axios.put(`/message/${id}`, data);
  },
};
