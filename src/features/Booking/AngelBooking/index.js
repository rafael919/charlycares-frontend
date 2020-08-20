import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import React, { Component } from 'react';

import { getErrors, getLoadingStatus } from '../../../ui/selectors';
import { LoadableFamilyProfile } from '../../AngelFamilies/routes';

import {
  onAngelAcceptBooking,
  onAngelDeclineChanges,
  onAngelAcceptChanges,
} from '../data/actions';
import { onErrorConfirm } from '../../../ui/actions';
import BookingInfo from './components/BookingInfo';
import ConfirmationSection from './components/ConfirmationSection';
import FamilySection from './components/FamilySection';
import Location from './components/Location';
import Message from './components/Message';
import API from './api';

class AngelBooking extends Component {
  initialState = {
    selectedDays: [],
    deselected: false,
    error: null,
    showPersonalMessage: false,
    isLoading: false,
  };
  state = this.initialState;

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
    } else {
      let initialState = {
        booking: this.props.booking,
        selectedDays: this.getDateIds(this.props.booking.bookings),
        deselected: Array.from(
          Array(this.props.booking.bookings.length),
          (v, i) => ({
            id: i,
            state: false,
          })
        ),
      };
      this.setState(initialState);
    }
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

  onShowPersonalMessage = () => {
    this.setState({
      showPersonalMessage: true,
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
    const { booking } = this.props;

    const payload = {
      booking_date_responses: this.state.selectedDays.reduce((arr, days) => {
        arr = [...arr, ...days];
        return arr;
      }, []),
    };

    this.props.history.push('/booking/angel-booking-confirm', {
      payload,
      id: this.state.booking.id || booking.id,
      days: this.state.booking.bookings || this.props.booking.bookings,
      selectedDays: this.state.selectedDays,
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

  sumSelectedDays = () => {
    if (this.state.selectedDays) {
      return this.state.selectedDays.reduce((acc, curr) => {
        return (
          acc +
          curr.reduce((a, c) => {
            if (c.current_state === 'accepted') {
              return a + 1;
            }
            return a;
          }, 0)
        );
      }, 0);
    }
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
    const data = this.state.booking || this.props.booking;
    return data && data.family_data && this.state.selectedDays ? (
      <Layout
        navBorder
        onNavBack={this.props.history.goBack}
        navTitle={<FormattedMessage id="navigation.tabs.booking" />}
        navSubTitle={
          <FormattedMessage
            id="booking.angel.offers.details.subTitle"
            values={{
              angelId: data.angel_id,
              bookingId: data.booking_id,
            }}
          />
        }
        navRightComponent={() => (
          <CustomLink to="/faq" primary>
            <FormattedMessage id="navigation.support" />
          </CustomLink>
        )}
      >
        <Error
          errors={this.props.errors || this.state.error}
          onErrorConfirm={
            this.state.error ? this.onErrorConfirm : this.props.onErrorConfirm
          }
        />
        {this.props.isLoading || this.state.isLoading ? <Loader /> : null}

        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <Grid container>
              <CustomRow padding="2.5rem 0 1rem 0">
                <FamilySection
                  history={this.props.history}
                  angelId={data.angel_id}
                  normalRate={data.normal_rate}
                  extraRate={data.extra_rate}
                  expectedEarnings={data.expected_earnings}
                  family={
                    Array.isArray(data.family_data)
                      ? data.family_data[0]
                      : data.family_data
                  }
                  chatAllowed={data.chat_allowed}
                  newMessage={data.new_messages}
                  distance={data.distance}
                  onShowPersonalMessage={this.onShowPersonalMessage}
                  showPersonalMessage={this.state.showPersonalMessage}
                  personalMessage={data.booking.message}
                />
              </CustomRow>
            </Grid>
            <BookingInfo
              onSelectAndDeselectAll={this.onSelectAndDeselectAll}
              onDayPress={this.onDayPress}
              booking={data}
              selectedDays={this.state.selectedDays}
              deselected={this.state.deselected}
              invitationState={data.current_state}
              responses={data.booking_date_responses}
            />
            <Divider />
            <Grid container>
              <CustomRow padding="1rem 0 0 0">
                <Location
                  city={data.family_data.city || data.family_data[0].city}
                  streetNumber={
                    data.family_data.street_number ||
                    data.family_data[0].street_number
                  }
                  address={
                    data.family_data.street_name ||
                    data.family_data[0].street_name
                  }
                  lat={data.family_data.lat || data.family_data[0].lat}
                  lon={data.family_data.lon || data.family_data[0].lon}
                />
              </CustomRow>
              <CustomRow padding="1rem 0 10rem 0">
                <Message message={data.booking.message} />
              </CustomRow>
            </Grid>
          </CustomColumn>
        </CustomRow>
        {data.current_state === 'pending' ? (
          <Confirmation>
            <ConfirmationSection
              total={this.total()}
              numOfAccepted={this.sumSelectedDays()}
              history={this.props.history}
              onDecline={this.onDecline}
              onAccept={this.onAccept}
            />
          </Confirmation>
        ) : null}
        {data.current_state === 'pending_edit' ? (
          <Confirmation>
            <ConfirmationSection
              total={this.total()}
              numOfAccepted={this.sumSelectedDays()}
              history={this.props.history}
              onDecline={this.onDeclineChanges}
              onAccept={this.onAcceptChanges}
            />
          </Confirmation>
        ) : null}
      </Layout>
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
    errors: getErrors(state),
    isLoading: getLoadingStatus(state),
  }),
  {
    onErrorConfirm,
    onAngelAcceptBooking,
    onAngelDeclineChanges,
    onAngelAcceptChanges,
  }
)(AngelBooking);
