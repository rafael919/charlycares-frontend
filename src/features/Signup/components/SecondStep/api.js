import axios from '../../../../axios';

export default {
  validate(data) {
    return axios.post('/validate', data);
  },
};
