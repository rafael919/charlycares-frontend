import axios from '../../../axios';

export default {
  getEventsForWeek(startDate, endDate) {
    return axios.get(`/events/${startDate}/${endDate}`);
  },
};
