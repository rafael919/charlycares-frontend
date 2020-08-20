import axios from '../../../axios';

export default {
  updateRating(bookingId, data) {
    return axios.put('/ratings/' + bookingId, data);
  },
};
