import axios from '../../axios';

export default {
  passwordReset(data) {
    return axios.post('/password/reset', data);
  },
};
