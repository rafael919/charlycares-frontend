import axios from '../../../axios';

export default {
  checkBookings(data) {
    return axios.put('/bookings', data);
  },
  editBooking(data) {
    return axios.put('/bookings/update', data);
  },
  cancelBooking(id) {
    return axios.post(`/bookings/${id}/cancel`);
  },
};
