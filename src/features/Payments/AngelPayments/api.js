import axios from '../../../axios';

export default {
  getPayments() {
    return axios.get('/payments/angel');
  },
};
