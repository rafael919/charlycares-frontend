import axios from '../../axios';

export default {
  sendReview(data) {
    return axios.post('/angel_reference', data);
  },
  getAngelData(angelId) {
  	return axios.get('/angel/get_data/' + angelId);
  },
};
