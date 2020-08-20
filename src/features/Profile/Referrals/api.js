import axios from '../../../axios';

export default {
  getReferrals(role) {
    return axios.get('/referrals/' + role);
  },
};
