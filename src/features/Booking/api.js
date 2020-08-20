import axios from '../../axios';

export default {
  onOfferAccept(bookingId, angelId) {
    return axios.post(`/bookings/${bookingId}/accept/${angelId}`);
  },
  onOfferDecline(bookingId, angelId) {
    return axios.post(`/bookings/${bookingId}/decline/${angelId}`);
  },
  angelLike(angel_id) {
    return axios.post('/angel/like', { angel_id: angel_id });
  },
  angelUnLike(angel_id) {
    return axios.post('/angel/unlike', { angel_id: angel_id });
  },
  cancelBooking(id) {
    return axios.post(`/bookings/${id}/cancel`);
  },
};
