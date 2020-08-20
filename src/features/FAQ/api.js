import axios from '../../axios/index';

export default {
  getFamilySupportFAQs(token) {
    return axios.get('/faq');
  },
  getAngleSupportFAQs(token) {
    return axios.get('/faq');
  },
};
