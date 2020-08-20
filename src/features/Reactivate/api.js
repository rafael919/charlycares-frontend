import axios from '../../axios';

export default {
  addPromoCode(coupon) {
    return axios.post('/membership/coupon', {
      coupon,
    });
  },
  activateMembership() {
    return axios.post('membership/reactivate');
  },
};
