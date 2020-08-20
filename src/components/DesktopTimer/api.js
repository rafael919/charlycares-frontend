import axios from '../../axios';

export default {
  getActiveSitting() {
    return axios.get('/active_timings/time');
  },
};
