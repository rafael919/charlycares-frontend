import axios from '../../../axios';

export default {
  getBooking(id) {
    return axios.get('/bookings/' + id);
  },
};
