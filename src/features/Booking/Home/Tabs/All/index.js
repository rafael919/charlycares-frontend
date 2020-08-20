//@flow
import { connect } from 'react-redux';
import { ProgressiveBookings } from 'Components/Progressive';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Error from 'Components/Error';
import React from 'react';
import WithRole from 'Components/WithRole';
import unionBy from 'lodash.unionby';
import throttle from 'lodash.throttle';

import { getEditedBooking, getCanceledBooking } from './selectors';
import {
  onEditedBookingClear,
  onCanceledBookingClear,
} from '../../../data/actions';
import API from './api';
import Bookings from '../components/Bookings';

type TProps = {
  history: Object,
  intl: Object,
  location: Object,
  match: Object,
  all: boolean,
  perPage: number,
  activeIndex: number,
  role: string,
  type:
    | 'all'
    | 'accepted'
    | 'pending'
    | 'declined'
    | 'given'
    | 'canceled'
    | 'ended',
};

type TBooking = {};

type TState = {
  bookings: Array<TBooking>,
  fetching: boolean,
  error: ?Object,
  hasMore: boolean,
  nextHref: ?string,
  initial: boolean,
};

class Tab extends React.Component<TProps, TState> {
  tab: ?Object = null;
  source: ?Object = {
    source: null,
    cancel: () => {},
  };

  static defaultProps = {
    bookings: [],
    type: 'all',
    perPage: 10,
  };

  state = {
    oldBookings: null,
    bookings: [],
    fetching: false,
    error: null,
    hasMore: true,
    nextHref: null,
    initial: true,
  };

  componentDidMount() {
    window.addEventListener('focus', this.onUpdate, false);
    this.interval = setInterval(this.onUpdate, 60000 * 5);
  }

  componentWillUnmount() {
    window.removeEventListener('focus', this.onUpdate);
    clearInterval(this.interval);
  }

  onUpdate = throttle(() => {
    const scrollEl = document.querySelector('#scroll');
    if (scrollEl && scrollEl.scrollTo) {
      scrollEl.scrollTo(0, 0);
    }
    this.setState(
      state => {
        return {
          ...state,
          oldBookings: state.bookings,
          bookings: [],
          fetching: false,
          error: null,
          nextHref: null,
          initial: true,
        };
      },
      () => {
        API.getBookings({
          role: this.props.role,
          type: this.props.type,
          perPage: this.props.perPage,
        })
          .then(({ data }) => {
            if (data.data) {
              this.setState(state => {
                return {
                  ...state,
                  bookings: unionBy(
                    data.data.bookings.data,
                    state.bookings,
                    'id'
                  ),
                  oldBookings: null,
                  nextHref: data.data.bookings.next_page_url,
                  fetching: false,
                  initial: !data.data.bookings.data.length ? true : false,
                  isLoading: false,
                };
              });
            }
          })
          .catch(err => {
            this.setState({
              error: err,
              hasMore: false,
              fetching: false,
            });
          });
      }
    );
  }, 3000);

  componentDidUpdate(prevProps) {
    if (this.props.activeIndex !== prevProps.activeIndex) {
      this.source.cancel();
      this.setState(state => {
        return {
          ...state,
          hasMore: true,
          bookings: [],
          nextHref: null,
        };
      });
    }

    if (this.props.editedBooking !== prevProps.editedBooking) {
      this.replaceBooking();
    }
    if (this.props.canceledBooking !== prevProps.canceledBooking) {
      this.removeBooking();
    }
  }

  replaceBooking = () => {
    if (this.props.editedBooking) {
      let updated;
      if (this.props.editedBooking.updated_invitations) {
        updated = this.props.editedBooking.updated_invitations;
      } else if (this.props.editedBooking.updated_booking) {
        updated = [this.props.editedBooking.updated_booking];
      } else {
        updated = [this.props.editedBooking];
      }
      if (this.props.editedBooking.other_bookings) {
        updated = [...updated, ...this.props.editedBooking.other_bookings];
      }

      this.setState(
        state => ({
          ...state,
          bookings: unionBy(updated, state.bookings, 'id'),
        }),
        () => {
          this.props.onEditedBookingClear();
        }
      );
    }
  };

  removeBooking = () => {
    if (this.props.canceledBooking !== null) {
      this.setState(
        state => ({
          ...state,
          bookings: unionBy([this.props.canceledBooking], state.bookings, 'id'),
        }),
        () => {
          this.props.onCanceledBookingClear();
        }
      );
    }
  };

  getBookings = () => {
    if ((!this.state.hasMore && !this.state.nextHref) || this.state.fetching)
      return;

    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();

    this.setState(
      state => ({ ...state, fetching: true }),
      () => {
        API.getBookings({
          role: this.props.role,
          type: this.props.type,
          perPage: this.props.perPage,
          nextHref: this.state.nextHref,
          cancelToken: this.source.token,
        })
          .then(({ data }) => {
            if (data.data) {
              if (data.data.bookings.next_page_url) {
                this.setState(state => {
                  return {
                    ...state,
                    bookings: [...state.bookings, ...data.data.bookings.data],
                    nextHref: data.data.bookings.next_page_url,
                    fetching: false,
                    initial: !data.data.bookings.data.length ? true : false,
                  };
                });
              } else {
                this.setState(state => ({
                  ...state,
                  bookings: [...state.bookings, ...data.data.bookings.data],
                  hasMore: false,
                  nextHref: null,
                  fetching: false,
                  initial: !data.data.bookings.data.length ? true : false,
                }));
              }
            }
          })
          .catch(err => {
            if (axios.isCancel(err)) {
              this.setState({
                fetching: false,
              });
            } else {
              this.setState({
                error: err,
                hasMore: false,
                fetching: false,
              });
            }
          });
      }
    );
  };

  render() {
    const { history } = this.props;
    if (
      (this.state.fetching && !this.state.bookings.length) ||
      (this.state.fetching &&
        !this.state.bookings.length &&
        this.state.oldBookings)
    ) {
      return (
        <React.Fragment>
          <ProgressiveBookings isLoading />
        </React.Fragment>
      );
    }

    if (this.state.error) {
      return <Error errors={this.state.error} onRetry={this.getBookings} />;
    }

    const bookings = this.state.bookings.length
      ? this.state.bookings
      : this.state.oldBookings;

    return (
      <WithRole>
        {role => (
          <Bookings
            type={this.props.type}
            getBookings={this.getBookings}
            hasMore={this.state.hasMore}
            role={role}
            history={history}
            bookings={bookings}
            initial={this.state.initial}
          />
        )}
      </WithRole>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      editedBooking: getEditedBooking(state),
      canceledBooking: getCanceledBooking(state),
    }),
    {
      onEditedBookingClear,
      onCanceledBookingClear,
    }
  )(Tab)
);
