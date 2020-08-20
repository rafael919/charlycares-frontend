import axios from '../../../axios';

export default {
  cancelMembership(data) {
    return axios.post('membership/cancel', data);
  },
  saveMembership(data) {
    return axios.put('membership', data);
  },
};
