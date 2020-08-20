import axios from '../../../axios';

export default {
  updateFamilyImage(data) {
    return axios.post('/family/photo', data);
  },
  updateAngelImage(data) {
    return axios.post('/angel/photo', data);
  },
  updateProfile(data, role) {
    return axios.put(`/profile/${role}`, data);
  },
  updateLanguages(data) {
    return axios.put('/language', data);
  },
  validate(data) {
    return axios.post('/validate', data);
  },
};
