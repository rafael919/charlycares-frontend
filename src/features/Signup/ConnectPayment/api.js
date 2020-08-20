import axios from '../../../axios';

export default {
  addPromoCode(coupon) {
    return axios.post('/membership/coupon', {
      coupon,
    });
  },
  getMembership() {
    return axios.get('/membership');
  },
};
