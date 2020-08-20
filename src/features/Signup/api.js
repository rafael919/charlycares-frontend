import axios from '../../axios';
import { apiErrorHandler, apiResponseHandler } from 'Utils';

export default {
  getAgendas() {
    return axios
      .get('/agendas/show')
      .then(apiResponseHandler)
      .catch(apiErrorHandler);
  },
  getTimeslots(id, week = 1, year) {
    return axios
      .get(`/agenda/${id}/${week}/${year}`)
      .then(apiResponseHandler)
      .catch(apiErrorHandler);
  },
  makeAppointment(id) {
    return axios
      .post('/agenda/makeAppointment', { id })
      .then(apiResponseHandler)
      .catch(apiErrorHandler);
  },
  cancelAppointment() {
    return axios
      .post('/agenda/cancelAppointment')
      .then(apiResponseHandler)
      .catch(apiErrorHandler);
  },
  appointment() {
    return axios.get('/agendas/show');
  },
};
