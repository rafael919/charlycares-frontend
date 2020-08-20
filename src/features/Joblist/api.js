import axios from '../../axios';

export default {
  getListings() {
    return axios.get('/invitations/jobs');
  },

  getBooking(bookingId) {
  	return axios.get('/invitations/jobs/' + bookingId)
  },

	angelAcceptJob(data) {
    return axios.post('/invitations/job', data);
  },
};
