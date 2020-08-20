import axios from '../../axios';

export default {
  getAnnouncement() {
    return axios.get('/announcement');
  }
};
