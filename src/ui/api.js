import axios from '../axios';

export default {
  getIndicators() {
    return axios.get('indicators');
  },
  setRead(data) {
    return axios.put('/messages/read', data);
  },
};
