import axios from '../../../axios';

export default {
  getRates(startTime, endTime) {
    return axios.post('/active_timings/calculate', {
      start_time: startTime,
      end_time: endTime,
    });
  },
  finishBooking(data) {
    return axios.post('/bookings/finish', data);
  },
};
