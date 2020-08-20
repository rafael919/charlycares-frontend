import axios from '../../../axios';

export default {
  cancelBooking(id, data) {
    return axios.post(`/bookings/${id}/cancel`, data);
  },
};
