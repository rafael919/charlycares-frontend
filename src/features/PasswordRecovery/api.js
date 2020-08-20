import axios from '../../axios';

export default {
  checkEmail(data) {
    return axios.post('/password/validate_email', data);
  },
};
