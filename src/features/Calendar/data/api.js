import axios from '../../../axios';

export default {
  updateEvent(id, data) {
    return axios.put('/events/' + id, data);
  },
  deleteEvent(id) {
    return axios.delete('/events/' + id);
  },
  deleteEventEverywhere(id) {
    return axios.delete('/events/' + id + '/recurring');
  },
  createEvent(data) {
    return axios.post('/events', data);
  },
  getWeekEvents(data) {
    return axios.get(
      `/events-with-availability/${data.weekStart}/${data.weekEnd}`
    );
  },
  upToDate() {
    return axios.post(`/angel/notify_families`);
  },
};
