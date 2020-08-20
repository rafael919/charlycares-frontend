// @flow

import axios from '../../../../../axios';

type TGetBookingsParams = {
  type:
    | 'all'
    | 'accepted'
    | 'pending'
    | 'declined'
    | 'given'
    | 'canceled'
    | 'desktop_given',
  perPage: number,
  role: string,
  nextHref: ?string,
  cancelToken: Object,
};

export default {
  getBookings({
    role,
    type,
    perPage,
    nextHref,
    cancelToken,
  }: TGetBookingsParams) {
    let url;
    if (nextHref) {
      url = nextHref;
    } else {
      url = `/bookings/${role}/${type}/${perPage}`;
    }

    return axios.get(url, {
      cancelToken,
    });
  },
};
