import axios from '../../axios';

export default {
  getIndicators () {
    return axios.get('indicators');
  },
};