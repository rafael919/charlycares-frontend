import axios from '../../axios';
import { apiResponseHandler, apiErrorHandler } from 'Utils';

export default {
  getAngel(id) {
    return axios.get('/angel/' + id);
  },
  getNewAngel(id, data) {
    return axios.post('/angel/profile/' + id, data);
  },
  getAngelSaga(id, bookingDates) {
    return axios
      .post('/angel/profile/' + id, { booking_dates: bookingDates })
      .then(apiResponseHandler)
      .catch(apiErrorHandler);
  },
  getRatings(id) {
    return axios.get('/angel/ratings/' + id);
  },
  getRatingsSaga(id) {
    return axios
      .get('/angel/ratings/' + id)
      .then(apiResponseHandler)
      .catch(apiErrorHandler);
  },
  angelLike(angel_id) {
    return axios.post('/angel/like', { angel_id: angel_id });
  },
  angelUnLike(angel_id) {
    return axios.post('/angel/unlike', { angel_id: angel_id });
  },
};
