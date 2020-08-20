import axios from '../../axios';

export default {
  familySignupSubmit(data) {
    return axios.post('/auth/family_sign_up', data);
  },
  angelSignupSubmit(data) {
    return axios.post('/auth/angel_sign_up', data);
  },
  childrenSubmit(children) {
    return axios.post('/kids', children);
  },
  login(data) {
    return axios.post('/auth/sign_in', data);
  },
  getFamily(token) {
    return axios.get('/family', {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getUser() {
    return axios.get('/user');
  },
  getProfile() {
    return axios.get('/profile');
  },
  getMembership() {
    return axios.get('/membership');
  },
  getLanguages() {
    return axios.get('/language');
  },
  getKids() {
    return axios.get('/kids');
  },
  getAngel(token) {
    return axios.get('/angel', {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getUserMessages() {
    return axios.get('/messages/unread_count');
  },
  getReferralSettings() {
    return axios.get('/campaigns');
  },
  getAngelData() {
    return axios.get('/angel');
  },
  setLanguages(data) {
    return axios.put('/language', data);
  },
  removeVideo() {
    return axios.post('/angel/remove_video');
  },
  getRatings() {
    return axios.get('/ratings');
  },
  updateLocale(data) {
    return axios.put('/user/locale', data);
  },
};
