import axios from '../../../axios';
import { getLocale } from 'Utils';

export default {
  getLandingPageData(referenceNo, target) {
  	const locale = getLocale() === 'nl' ? 'nl_NL' : 'en_GB';
    return axios.get('/current_campaign/'+referenceNo + '/' + target + '/' + locale);
  },
};
