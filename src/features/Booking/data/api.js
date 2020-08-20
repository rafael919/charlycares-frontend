import axios from '../../../axios';

export default {
  searchAngels(data) {
    return axios.post('/match', data);
  },
  getBookings() {
    return axios.get('/bookings/family/all/30');
  },
  getAngelsForBooking(bookingId) {
    return axios.post('/add_angels', { booking_id: bookingId });
  },
  addAngelsToBooking(data) {
    return axios.post('/bookings/add_angels', data);
  },
  declineBooking(id, angelId) {
    return axios.post(`/bookings/${id}/decline/${angelId}`);
  },
  getBookingsForAngel() {
    return axios.get('/bookings/angel');
  },
  angelAcceptBooking(id, data) {
    return axios.put('/invitations/accept/' + id, data);
  },
  angelDeclineChanges(id) {
    return axios.put('/bookings/cancelEdit/' + id); 
  },
  angelAcceptChanges(id) {
    return axios.put('/bookings/acceptEdit/' + id); 
  },
  angelDeclineBooking(id, data) {
    return axios.put('/invitations/decline/' + id, data);
  },
};
