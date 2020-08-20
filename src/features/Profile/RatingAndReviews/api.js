import axios from '../../../axios';

export default {
  getRatings() {
    return axios.get('/ratings');
  },
};
