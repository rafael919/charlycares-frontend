import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import { Segment, Divider } from 'semantic-ui-react';
import Confirmation from 'Components/Confirmation';
import CustomDivider from 'Components/Divider';
import Error from 'Components/Error';
import Loader from 'Components/Loader';
import Navigation from 'Components/Navigation';
import React, { Component } from 'react';
import styled from 'styled-components';

import { getErrors, getLoadingStatus } from '../../../ui/selectors';
import { LoadableFamilyProfile } from '../../AngelFamilies/routes';
import { onAngelAcceptJob } from '../actions';
import { onErrorConfirm } from '../../../ui/actions';
import API from '../api';
import BookingInfo from '../components/BookingInfo';
import ConfirmationSection from '../components/ConfirmationSection';
import FamilySection from '../components/FamilySection';
import Location from '../components/Location';
import Message from '../components/Message';

const Container = styled.div`
  ${isMobile &&
    `overflow-x: hidden;
padding-bottom: 3.5rem;`}
`;

const paddingBottomStyle = !isMobile
  ? {
      bottom: '-3.5rem',
    }
  : null;

class AngelJob extends Component {
  initialState = {
    selectedDays: [],
    deselected: false,
    error: null,
    isLoading: false,
  };
  state = this.initialState;
  // constructor(props) {
  //   super(props);

  //   if (!this.props.booking.booking) {
  //     this.props.history.push('/booking');
  //     this.initialState = {
  //       selectedDays: [],
  //       deselected: false,
  //     };
  //   } else {
  //     this.initialState = {
  //       selectedDays: this.getDateIds(this.props.booking.bookings),
  //       deselected: Array.from(
  //         Array(this.props.booking.bookings.length),
  //         (v, i) => ({
  //           id: i,
  //           state: false,
  //         })
  //       ),
  //     };
  //   }

  //   this.state = this.initialState;
  // }

  componentDidMount() {
    LoadableFamilyProfile.preload();

    this.setState(
      {
        isLoading: true,
      },
      () => {
        API.getBooking(this.props.match.params.bookingId)
          .then(res => {
            this.setState({
              booking: res.data.data,
              isLoading: false,
              selectedDays: this.getDateIds(res.data.data.bookings),
              deselected: Array.from(
                Array(res.data.data.bookings.length),
                (v, i) => ({
                  id: i,
                  state: false,
                })
              ),
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
  }
  onDayPress = (currentDay, id) => () => {
    this.setState(state => ({
      selectedDays: state.selectedDays.map((d, i) => {
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
      }),
    }));
  };

  onSelectAndDeselectAll = dayIndex => () => {
    this.setState(prevState => {
      if (prevState.deselected[dayIndex].state === false) {
        return {
          selectedDays: prevState.selectedDays.map((d, i) => {
            if (i === dayIndex) {
              return d.map(data => ({
                ...data,
                current_state: 'declined',
              }));
            }
            return d;
          }),
          deselected: prevState.deselected.map((d, i) => {
            if (d.id === dayIndex) {
              return {
                ...d,
                state: true,
              };
            }
            return d;
          }),
        };
      }
      return {
        selectedDays: prevState.selectedDays.map((d, i) => {
          if (i === dayIndex) {
            return d.map(data => ({
              ...data,
              current_state: 'accepted',
            }));
          }
          return d;
        }),
        deselected: prevState.deselected.map((d, i) => {
          if (d.id === dayIndex) {
            return {
              ...d,
              state: false,
            };
          }
          return d;
        }),
      };
    });
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

  onAccept = () => {
    const { booking } = this.state;
    this.props.history.push('/joblist/confirmation', {
      angelId: booking.booking.angel_id,
      bookingId: booking.booking.id,
      days: booking.bookings,
    });
  };

  onDecline = () => {
    this.props.history.push('/booking/angel-booking-decline/', {
      bookingId: this.props.booking.id,
      invitationId: this.props.booking.id,
    });
  };

  onErrorConfirm = () => {
    this.setState({
      error: null,
    });
  };

  render() {
    if (
      this.state.booking &&
      this.state.booking.family_data &&
      this.state.selectedDays
    ) {
      const {
        family_data,
        booking,
        angel_id,
        normal_rate,
        extra_rate,
        expected_earnings,
        distance,
        chat_allowed,
        message,
        bookings,
      } = this.state.booking;

      return (
        <Container>
          <Navigation
            title={<FormattedMessage id="navigation.tabs.booking" />}
            subTitle={
              <FormattedMessage
                id="joblist.angel.subTitle"
                values={{
                  bookingId: booking.id,
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

          <Segment basic vertical>
            <Segment basic vertical>
              <FamilySection
                history={this.props.history}
                angelId={angel_id}
                normalRate={normal_rate}
                extraRate={extra_rate}
                expectedEarnings={expected_earnings}
                family={
                  Array.isArray(family_data) ? family_data[0] : family_data
                }
                distance={distance}
                chatEnabled={chat_allowed}
              />
            </Segment>
            <CustomDivider>
              <FormattedMessage id="request" />
            </CustomDivider>
            <BookingInfo
              onSelectAndDeselectAll={this.onSelectAndDeselectAll}
              onDayPress={this.onDayPress}
              booking={this.state.booking}
              selectedDays={this.state.selectedDays}
              deselected={this.state.deselected}
            />
            <Divider fitted />
            <Segment basic vertical>
              <Location
                streetNumber={
                  Array.isArray(family_data)
                    ? family_data[0].street_number
                    : family_data.street_number
                }
                city={
                  Array.isArray(family_data)
                    ? family_data[0].city
                    : family_data.city
                }
                address={
                  Array.isArray(family_data)
                    ? family_data[0].street_name
                    : family_data.street_name
                }
                lat={
                  Array.isArray(family_data)
                    ? family_data[0].lat
                    : family_data.lat
                }
                lon={
                  Array.isArray(family_data)
                    ? family_data[0].lon
                    : family_data.lon
                }
              />
            </Segment>
            {Boolean(message) ? (
              <Segment basic vertical>
                <Message message={message} />
              </Segment>
            ) : null}
          </Segment>
          <Confirmation style={paddingBottomStyle}>
            <ConfirmationSection
              total={bookings.length}
              numOfAccepted={this.state.selectedDays.length}
              history={this.props.history}
              onAccept={this.onAccept}
            />
          </Confirmation>
        </Container>
      );
    } else {
      return <Loader />;
    }
  }

  static defaultProps = {
    booking: {
      family_data: [{}],
      angel_id: '',
      booking_id: '',
    },
  };
}

export default connect(
  (state, props) => ({
    errors: getErrors(state),
    isLoading: getLoadingStatus(state),
  }),
  {
    onErrorConfirm,
    onAngelAcceptJob,
  }
)(AngelJob);
