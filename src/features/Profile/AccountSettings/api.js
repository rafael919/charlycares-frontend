import axios from '../../../axios';

export default {
  updateAngelSettings(data) {
    return axios.put('/settings/angel', data);
  },
  updateFamilySettings(data) {
    return axios.put('/settings/family', data);
  },
  updateProfile(data) {
    return axios.put('/profile', data);
  },
  updateFBInfo(data) {
    return axios.put('/settings/fb', data);
  },
  updateUser(data) {
    return axios.put('/user', data);
  },
  updateUserProfile(data, role) {
    return axios.put(`/profile/${role}`, data); 
  }
};
