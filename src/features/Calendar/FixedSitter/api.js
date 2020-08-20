import axios from '../../../axios';

export default {
  getAvailability() {
    return axios.get('/angel/calendar/availability');
  },
  updateAvailability(data) {
    return axios.put('/angel/calendar/availability', data);
  },
};
