import axios from '../../../axios';

export default {
  addPromoCode(data) {
    return axios.post('membership/coupon', data);
  },
};
