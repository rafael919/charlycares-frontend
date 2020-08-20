import axios from '../../../axios';

export default {
  getOuStandingPayments(referenceNo) {
    return axios.get('payments/outstanding/'+referenceNo);
  },
};
