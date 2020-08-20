import { FormattedMessage } from 'react-intl';
import { isAngel } from 'Utils';
import curry from 'ramda/es/curry';
import Divider from 'Components/Divider';
import InfiniteScroll from 'react-infinite-scroller';
import memoizeWith from 'ramda/es/memoizeWith';
import moment from 'moment';
import React from 'react';
import WithRole from 'Components/WithRole';
import WithoutBookings from '../../components/WithoutBookings';
import {
  disableBodyScroll,
  clearAllBodyScrollLocks,
  enableBodyScroll,
} from 'body-scroll-lock';

import AngelBooking from './components/AngelBooking';
import Booking from './components/Booking';
import Container from './components/Container';
import ListDivider from './components/ListDivider';

const filterBookingsWithFiniteAndNonFiniteStatuses = bookings => {
  let updated = [];
  let finite = [];
  let nonFinite = [];

  let finiteStatuses = [
    'ended',
    'accepted',
    'canceled',
    'declined',
    'given',
    'expired',
  ];

  if (bookings && bookings.length > 0) {
    for (let i = 0; i < bookings.length; i++) {
      if (moment(bookings[i].updated_at) > moment().subtract(5, 'minutes')) {
        updated.push(bookings[i]);
      } else if (finiteStatuses.includes(bookings[i].current_state)) {
        finite.push(bookings[i]);
      } else {
        nonFinite.push(bookings[i]);
      }
    }

    nonFinite = updated.concat(nonFinite);

    return {
      finite,
      nonFinite,
    };
  }
  return {
    finite: [],
    nonFinite: [],
  };
};

const BookingWithRole = props => (
  <WithRole>
    {role => {
      const hasAngelRole = isAngel(role);
      return hasAngelRole ? (
        <AngelBooking {...props} angel={hasAngelRole} />
      ) : (
        <Booking {...props} />
      );
    }}
  </WithRole>
);

// const onShowDetails = memoizeWith(
//   (history, id) => id,
//   curry((history, id, _ev) => history.push('/booking/details/' + id))
// );

const onShowOffer = memoizeWith(
  (history, id) => id,
  curry((history, id, _ev) => history.push('/booking/offer/' + id))
);

const onShowAccepted = memoizeWith(
  (history, id) => id,
  curry((history, id, _ev) => history.push('/booking/accepted/' + id))
);

const onPendingPayment = memoizeWith(
  (history, id, path) => id,
  curry((history, id, path, _ev) => history.push('/no-membership'))
);
const onOfferSelect = memoizeWith(
  (history, id, path) => id,
  curry((history, id, path, _ev) => history.push(path + id))
);

class Bookings extends React.Component {
  componentDidMount() {
    const menu = document.querySelector('.secondary.menu');
    if (menu && this.parentNode) {
      menu.addEventListener('touchstart', this.enableScroll);
      menu.addEventListener('touchend', this.disableScroll);

      disableBodyScroll(this.parentNode);
    }
  }

  enableScroll = () => {
    enableBodyScroll(this.parentNode);
  };
  disableScroll = () => {
    disableBodyScroll(this.parentNode);
  };

  componentWillUnmount() {
    clearAllBodyScrollLocks();
    const menu = document.querySelector('.secondary.menu');
    menu.removeEventListener('touchstart', this.enableScroll);
    menu.removeEventListener('touchend', this.disableScroll);
  }

  render() {
    const { role, bookings, history, type, initial, hasMore } = this.props;
    const {
      finite = [],
      nonFinite = [],
    } = filterBookingsWithFiniteAndNonFiniteStatuses(bookings);

    const isTherePendingBookings = nonFinite.find(
      b =>
        b.current_state === 'pending' || b.current_state === 'pending_payment'
    );

    return (
      <Container
        id="scroll"
        hasPending={Boolean(isTherePendingBookings)}
        innerRef={el => (this.parentNode = el)}
      >
        {Boolean(isTherePendingBookings) ? (
          <Divider>
            <FormattedMessage id="outstanding" />
          </Divider>
        ) : null}
        <InfiniteScroll
          element="ul"
          style={{
            width: '100%',
            padding: 0,
            margin: 0,
            listStyle: 'none',
          }}
          useWindow={false}
          pageStart={0}
          loadMore={this.props.getBookings}
          hasMore={hasMore}
          threshold={300}
          getScrollParent={() => this.parentNode}
        >
          {!nonFinite.length &&
          !finite.length &&
          type === 'all' &&
          initial === true ? (
            <WithoutBookings role={role} history={history} />
          ) : null}
          {nonFinite.map((booking, i) => {
            let path = '/booking/offer/';
            if (role === 'angel') {
              path = '/booking/angel-booking/';
            } else {
              booking.current_state === 'accepted'
                ? (path = '/booking/accepted/')
                : booking.current_state === 'pending_edit'
                ? (path = '/booking/accepted/')
                : booking.current_state === 'ended'
                ? (path = '/booking/accepted/')
                : booking.current_state === 'canceled'
                ? (path = '/booking/offer/')
                : booking.current_state === 'pending'
                ? (path = '/booking/offer/')
                : (path = '/booking/details/');
            }
            if (nonFinite.length - 1 === i) {
              if (role === 'angel' && booking && booking.booking) {
                return (
                  <BookingWithRole
                    familyData={booking.family_data && booking.family_data[0]}
                    onBookingSelect={onOfferSelect(history, booking.id, path)}
                    noBorder
                    key={booking.id}
                    startDate={booking.booking.start_date}
                    endDate={booking.booking.end_date}
                    repeatQty={booking.repeat_qty}
                    status={booking.current_state}
                    bookings={booking.bookings}
                    expiresAt={booking.expires_at}
                  />
                );
              }
              return (
                <BookingWithRole
                  familyData={booking.family_data && booking.family_data[0]}
                  onBookingSelect={onOfferSelect(history, booking.id, path)}
                  noBorder
                  key={booking.id}
                  startDate={booking.start_date}
                  endDate={booking.end_date}
                  repeatQty={booking.repeat_qty}
                  status={booking.current_state}
                  offer={booking.has_offer}
                  angelInfo={booking.angel_data}
                  allDeclined={booking.all_declined}
                />
              );
            }

            if (role === 'angel' && booking && booking.booking) {
              return (
                <BookingWithRole
                  familyData={booking.family_data && booking.family_data[0]}
                  onBookingSelect={onOfferSelect(history, booking.id, path)}
                  key={booking.id}
                  startDate={booking.booking.start_date}
                  endDate={booking.booking.end_date}
                  repeatQty={booking.repeat_qty}
                  status={booking.current_state}
                  bookings={booking.bookings}
                  expiresAt={booking.expires_at}
                />
              );
            }
            return (
              <BookingWithRole
                familyData={booking.family_data && booking.family_data[0]}
                onBookingSelect={
                  booking.current_state === 'pending_payment'
                    ? onPendingPayment(history, booking.id, path)
                    : onOfferSelect(history, booking.id, path)
                }
                key={booking.id}
                startDate={booking.start_date}
                endDate={booking.end_date}
                repeatQty={booking.repeat_qty}
                status={booking.current_state}
                offer={booking.has_offer}
                angelInfo={booking.angel_data}
                allDeclined={booking.all_declined}
              />
            );
          })}
          <ListDivider />
          {finite.map(booking => {
            const path = '/booking/angel-booking/';
            if (role === 'angel' && booking && booking.booking) {
              return (
                <BookingWithRole
                  familyData={booking.family_data && booking.family_data[0]}
                  key={booking.id}
                  onBookingSelect={onOfferSelect(history, booking.id, path)}
                  startDate={booking.booking.start_date}
                  endDate={booking.booking.end_date}
                  repeatQty={booking.repeat_qty}
                  status={booking.current_state}
                  bookings={booking.bookings}
                  expiresAt={booking.expires_at}
                />
              );
            }
            return (
              <BookingWithRole
                familyData={booking.family_data && booking.family_data[0]}
                key={booking.id}
                onBookingSelect={
                  role !== 'family'
                    ? null
                    : booking.current_state === 'accepted' ||
                      booking.current_state === 'ended'
                    ? onShowAccepted(history, booking.id)
                    : onShowOffer(history, booking.id)
                }
                startDate={booking.start_date}
                endDate={booking.end_date}
                repeatQty={booking.repeat_qty}
                status={booking.current_state}
                angelInfo={booking.angel_data}
                allDeclined={booking.all_declined}
              />
            );
          })}
        </InfiniteScroll>
      </Container>
    );
  }
}

export default Bookings;
