import axios from '../../axios';

export default {
  getFavorites() {
    return axios.get('/conversations');
  },
  getActiveSitting() {
    return axios.get('/active_timings/time');
  },
  removeFavoriteAngel(data) {
    return axios.post('/angel/remove', data);
  },
};
