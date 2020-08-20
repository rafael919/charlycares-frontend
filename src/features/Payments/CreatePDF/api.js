import axios from '../../../axios';

export default {
  exportPayments(data) {
    return axios.post('/payments/export', data);
  },
};
