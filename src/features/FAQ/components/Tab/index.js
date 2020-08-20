//@flow
import { withRouter } from 'react-router-dom';
import React from 'react';
import Bookings from '../components/Bookings';
import WithoutBookings from '../components/WithoutBookings';
import WithRole from 'Components/WithRole';

type Props = {
  history: Object,
  intl: Object,
  location: Object,
  match: Object,
  bookings: Array<Object>,
  isLoading: boolean,
  all: boolean,
};

const AllTab = ({ history, bookings = [] }: Props) => {
  if (bookings && !bookings.length) {
    return <WithoutBookings history={history} />;
  }
  if (bookings && bookings.length > 0) {
    return (
      // null
      <WithRole>
        {role => <Bookings role={role} history={history} bookings={bookings} />}
      </WithRole>
    );
  }

  return <Bookings history={history} bookings={bookings} />;
};

export default withRouter(AllTab);
