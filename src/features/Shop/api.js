import axios from '../../axios';

export default {
  getGifts() {
    return axios.get('/gifts');
  },
  getTransactions() {
    return axios.get('/transactions');
  },
  buyGift(data) {
    return axios.post('/purchase', data);
  },
};
