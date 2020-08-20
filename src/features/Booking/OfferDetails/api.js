import axios from '../../../axios';

export default {
  getBooking(id) {
    return axios.get('/bookings/' + id);
  },
  declineBooking(id, angelId) {
    return axios.post(`/bookings/${id}/decline/${angelId}`);
  },
  cancelBooking(id, angelId) {
    return axios.post(`/bookings/${id}/cancel`);
  },
  onOfferAccept(bookingId, angelId) {
    return axios.post(`bookings/${bookingId}/accept/${angelId}`);
  },
  onRequestAgain(bookingId, invitationId) {
    return axios.post(`bookings/${bookingId}/extend/${invitationId}`);
  },
};
