import axios from '../../../axios';

export default {
  getInviteData(userID) {
    return axios.get('/current_campaign/share/'+userID);
  },
};
