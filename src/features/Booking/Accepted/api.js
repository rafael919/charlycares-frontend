import axios from '../../../axios';

export default {
  getBooking(id) {
    return axios.get('/bookings/' + id);
  },
  cancelBooking(bookingId) {
  	return axios.post(`/bookings/${bookingId}/cancel`);
  }
};
