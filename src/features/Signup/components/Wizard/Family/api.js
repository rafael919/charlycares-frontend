import axios from '../../../../../axios';

export default {
  checkPostalCode(data) {
    return axios.post('/postcode/validate', data);
  },
};
