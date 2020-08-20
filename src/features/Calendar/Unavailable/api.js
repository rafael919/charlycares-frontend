import axios from '../../../axios/index';

export default {
  getStatus() {
    return axios.get('/angel');
  },
  updateInactiveStatus(data) {
    return axios.put('/angel/setInactiveForPeriod', data);
  },
  stopTimer() {
    return axios.put('/angel/setActive');
  },
};
