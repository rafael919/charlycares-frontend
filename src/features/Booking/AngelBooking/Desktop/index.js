import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Segment, Divider } from 'semantic-ui-react';
import Confirmation from 'Components/Confirmation';
import Error from 'Components/Error';
import Loader from 'Components/Loader';
import Navigation from 'Components/Navigation';
import React, { Component, Fragment } from 'react';

import {
  getEditedBooking,
  getAngelSelectedDays,
  getAngelDeselectedDays,
  getCurrentBookingId,
} from '../selectors';
import { getErrors, getLoadingStatus } from '../../../../ui/selectors';
import { LoadableFamilyProfile } from '../../../AngelFamilies/routes';

import {
  onAngelAcceptBooking,
  onAngelDeclineChanges,
  onAngelAcceptChanges,
  angelBookingSetSelectedAndDeselectedDays,
  onBookingEdit,
} from '../../data/actions';
import { onErrorConfirm } from '../../../../ui/actions';
import API from '../api';
import BookingInfo from '../components/BookingInfo';
import ConfirmationSection from '../components/ConfirmationSection';
import FamilySection from '../components/FamilySection';
import Location from '../components/Location';
import Message from '../components/Message';
import anime from 'animejs';

class AngelBooking extends Component {
  initialState = {
    selectedDays: [],
    deselected: false,
    error: null,
    isLoading: false,
  };

  state = this.initialState;

  messageDiv = React.createRef();

  componentDidMount() {
    LoadableFamilyProfile.preload();
    if (!this.props.booking || !this.props.booking.booking) {
      this.setState(
        {
          isLoading: true,
        },
        () => {
          API.getBooking(this.props.match.params.bookingId)
            .then(res => {
              if (
                this.props.currentBookingId !==
                this.props.match.params.bookingId
              ) {
                this.props.angelBookingSetSelectedAndDeselectedDays({
                  selected: this.getDateIds(res.data.data.bookings),
                  deselected: Array.from(
                    Array(res.data.data.bookings.length),
                    (v, i) => ({
                      id: i,
                      state: false,
                    })
                  ),
                  currentAngelBookingId: this.props.match.params.bookingId,
                });
              }
              this.setState({
                booking: res.data.data,
                isLoading: false,
              });
            })
            .catch(err => {
              this.setState({
                error: err,
                isLoading: false,
              });
            });
        }
      );
    } else {
      if (this.props.currentBookingId !== this.props.match.params.bookingId) {
        this.props.angelBookingSetSelectedAndDeselectedDays({
          selected: this.getDateIds(this.props.booking.bookings),
          deselected: Array.from(
            Array(this.props.booking.bookings.length),
            (v, i) => ({
              id: i,
              state: false,
            })
          ),
          currentAngelBookingId: this.props.match.params.bookingId,
        });
      }
      let initialState = {
        booking: this.props.booking,
      };
      this.setState(initialState);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.editedBooking !== this.props.editedBooking &&
      this.props.editedBooking !== null
    ) {
      this.setState({
        booking: this.props.editedBooking.accepted_invitation,
      });
    }
  }

  onDayPress = (currentDay, id) => () => {
    const selectedDays = this.props.selectedDays.map((d, i) => {
      if (i === currentDay) {
        return d.map(data => {
          if (data.booking_dates_id === id) {
            if (data.current_state === 'accepted') {
              return {
                ...data,
                current_state: 'declined',
              };
            }
            return {
              ...data,
              current_state: 'accepted',
            };
          }
          return data;
        });
      }
      return d;
    });

    this.props.angelBookingSetSelectedAndDeselectedDays({
      selected: selectedDays,
    });
  };

  onSelectAndDeselectAll = dayIndex => () => {
    if (this.props.deselected[dayIndex].state === false) {
      this.props.angelBookingSetSelectedAndDeselectedDays({
        selected: this.props.selectedDays.map((d, i) => {
          if (i === dayIndex) {
            return d.map(data => ({
              ...data,
              current_state: 'declined',
            }));
          }
          return d;
        }),
        deselected: this.props.deselected.map((d, i) => {
          if (d.id === dayIndex) {
            return {
              ...d,
              state: true,
            };
          }
          return d;
        }),
      });
    } else {
      this.props.angelBookingSetSelectedAndDeselectedDays({
        selected: this.props.selectedDays.map((d, i) => {
          if (i === dayIndex) {
            return d.map(data => ({
              ...data,
              current_state: 'accepted',
            }));
          }
          return d;
        }),
        deselected: this.props.deselected.map((d, i) => {
          if (d.id === dayIndex) {
            return {
              ...d,
              state: false,
            };
          }
          return d;
        }),
      });
    }
  };

  getDateIds(dates = []) {
    if (Array.isArray(dates)) {
      return dates.map(days => {
        return days.bookingdates.map(date => {
          return {
            invitation_id: this.props.booking && this.props.booking.id,
            booking_dates_id: date.id,
            current_state: 'accepted',
          };
        });
      });
    } else {
      if (dates.bookingdates) {
        return dates.bookingdates.map(date => {
          return {
            invitation_id: this.props.booking && this.props.booking.id,
            booking_dates_id: date.id,
            current_state: 'accepted',
          };
        });
      }
      return [];
    }
  }

  onShowPersonalMessage = () => {
    if (this.messageDiv.current) {
      this.messageDiv.current.style.paddingBottom = '62rem';
      anime({
        targets: '#rightColumn',
        scrollTop: [0, this.messageDiv.current.scrollHeight - 360],
        easing: 'easeInOutQuad',
        duration: 300,
      });
    }
  };

  onAccept = () => {
    const { booking } = this.props;

    const payload = {
      booking_date_responses: this.props.selectedDays.reduce((arr, days) => {
        arr = [...arr, ...days];
        return arr;
      }, []),
    };

    this.props.history.push('/booking/angel-booking-confirm', {
      payload,
      id: this.state.booking.id || booking.id,
      days: this.state.booking.bookings || this.props.booking.bookings,
      selectedDays: this.props.selectedDays,
      deselected: this.props.deselected,
      bookingId: this.state.booking.booking_id || this.props.booking.booking_id,
      angelId: this.state.booking.angel_id || this.props.booking.angel_id,
      familyName: this.state.booking.family_data[0].last_name,
    });
  };

  onDecline = () => {
    const data = this.state.booking || this.props.booking;
    this.props.history.push('/booking/angel-booking-decline/', {
      bookingId: data.id,
      invitationId: data.id,
    });
  };

  onDeclineChanges = () => {
    const { onAngelDeclineChanges } = this.props;
    onAngelDeclineChanges(this.state.booking.booking_id, this.props.history);
  };

  onAcceptChanges = () => {
    const { onAngelAcceptChanges } = this.props;
    onAngelAcceptChanges(this.state.booking.booking_id, this.props.history);
  };

  onErrorConfirm = () => {
    this.setState({
      error: null,
    });
  };

  numOfSelected = () => {
    return this.props.selectedDays.reduce((acc, cur) => {
      const sum = cur.reduce((a, c) => {
        if (c.current_state === 'accepted') {
          return a + 1;
        }
        return a;
      }, 0);
      return acc + sum;
    }, 0);
  };
  total = () => {
    if (this.state.booking) {
      return this.state.booking.bookings.reduce((acc, cur) => {
        const sum = cur.bookingdates.reduce((a, c) => {
          return a + 1;
        }, 0);
        return acc + sum;
      }, 0);
    }
  };

  render() {
    const data = this.state.booking;
    return data && data.family_data && this.props.selectedDays ? (
      <Fragment>
        <Navigation
          title={<FormattedMessage id="navigation.tabs.booking" />}
          subTitle={
            <FormattedMessage
              id="booking.angel.offers.details.subTitle"
              values={{
                angelId: data.angel_id,
                bookingId: data.booking_id,
              }}
            />
          }
          onBack={this.props.history.goBack}
        />

        <Error
          errors={this.props.errors || this.state.error}
          onErrorConfirm={
            this.state.error ? this.onErrorConfirm : this.props.onErrorConfirm
          }
        />
        {this.props.isLoading || this.state.isLoading ? <Loader /> : null}

        <Segment basic vertical>
          <Segment basic vertical>
            <FamilySection
              history={this.props.history}
              angelId={data.angel_id}
              normalRate={data.normal_rate}
              extraRate={data.extra_rate}
              expectedEarnings={data.expected_earnings}
              chatAllowed={data.chat_allowed}
              newMessage={data.new_messages}
              family={
                Array.isArray(data.family_data)
                  ? data.family_data[0]
                  : data.family_data
              }
              distance={data.distance}
              onShowPersonalMessage={this.onShowPersonalMessage}
              showPersonalMessage={this.state.showPersonalMessage}
              personalMessage={data.booking.message}
            />
          </Segment>
          <BookingInfo
            onSelectAndDeselectAll={this.onSelectAndDeselectAll}
            onDayPress={this.onDayPress}
            booking={data}
            selectedDays={this.props.selectedDays}
            deselected={this.props.deselected}
            invitationState={data.current_state}
            responses={data.booking_date_responses}
          />
          <Divider fitted />
          <Segment basic vertical>
            <Location
              streetNumber={
                data.family_data.street_number ||
                data.family_data[0].street_number
              }
              city={data.family_data.city || data.family_data[0].city}
              address={
                data.family_data.street_name || data.family_data[0].street_name
              }
              lat={data.family_data.lat || data.family_data[0].lat}
              lon={data.family_data.lon || data.family_data[0].lon}
            />
          </Segment>
          {data.booking && Boolean(data.booking.message) ? (
            <Segment basic vertical>
              <Message ref={this.messageDiv} message={data.booking.message} />
            </Segment>
          ) : null}
        </Segment>
        {data.current_state === 'pending' && (
          <Confirmation style={{ bottom: '-3rem' }}>
            <ConfirmationSection
              total={this.total()}
              numOfAccepted={this.numOfSelected()}
              history={this.props.history}
              onDecline={this.onDecline}
              onAccept={this.onAccept}
            />
          </Confirmation>
        )}
        {data.current_state === 'pending_edit' && (
          <Confirmation style={{ bottom: '-3rem' }}>
            <ConfirmationSection
              total={this.total()}
              numOfAccepted={this.numOfSelected()}
              history={this.props.history}
              onDecline={this.onDeclineChanges}
              onAccept={this.onAcceptChanges}
            />
          </Confirmation>
        )}
      </Fragment>
    ) : null;
  }

  static defaultProps = {
    booking: {
      family_date: [{}],
      angel_id: '',
      booking_id: '',
    },
  };
}

export default connect(
  (state, props) => ({
    editedBooking: getEditedBooking(state, props),
    errors: getErrors(state),
    isLoading: getLoadingStatus(state),
    selectedDays: getAngelSelectedDays(state),
    deselected: getAngelDeselectedDays(state),
    currentBookingId: getCurrentBookingId(state),
  }),
  {
    onErrorConfirm,
    onAngelAcceptBooking,
    onAngelDeclineChanges,
    onAngelAcceptChanges,
    onBookingEdit,
    angelBookingSetSelectedAndDeselectedDays,
  }
)(AngelBooking);
