import axios from '../../../axios';

export default {
  updateEvent(id, data) {
    return axios.put('/events/' + id, data);
  },
  deleteEvent(id) {
    return axios.delete('/events/' + id);
  },
  createEvent(data) {
    return axios.post('/events', data);
  },
};
