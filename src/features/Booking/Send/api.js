import axios from '../../../axios';
export default {
  createBooking(data) {
    return axios.post('/bookings', data);
  },
};
