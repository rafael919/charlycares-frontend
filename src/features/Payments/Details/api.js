import axios from '../../../axios';

export default {
  getRates() {
    return axios.post('/active_timings/calculate', {});
  },
};
