import axios from '../../../axios';

export default {
  getPreferences() {
    return axios.get('/angel/preferences');
  },
  updatePreferences(data) {
    return axios.put('/angel/preferences', data);
  },
};
