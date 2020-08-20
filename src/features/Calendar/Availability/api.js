import axios from '../../../axios';

export default {
  getEvents(startDate, endDate, id) {
    if (Boolean(id)) {
      return axios.get(
        `/events-with-availability/${startDate}/${endDate}/${id}`
      );
    }
    return axios.get(`/events-with-availability/${startDate}/${endDate}`);
  },

  getEventsFamily(startDate, endDate, id) {
    if (Boolean(id)) {
      return axios.get(
        `/events-with-availability/${startDate}/${endDate}/${id}`
      );
    }
    return axios.get(`/family_events/${startDate}/${endDate}`);
  },
};
