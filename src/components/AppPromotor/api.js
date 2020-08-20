import axios from '../../axios';

export default {
  sendDownloadLink(data) {
    return axios.post('/sms/app-download', data);
  },
};
