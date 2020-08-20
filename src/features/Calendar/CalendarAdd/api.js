import axios from '../../../axios';

export default {
  addInCalendar(data) {
    return axios.post('/events', data);
  },

  addStandByEvents(data) {
  	return axios.post('/standby', data); 
  }, 

  getStandByEvents() {
  	return axios.get('/standby'); 
  },
};
