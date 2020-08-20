import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAge } from 'Utils';
import { Grid, Segment } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import moment from 'moment';
import Navigation from 'Components/Navigation';
import PhoneModal from 'Components/PhoneModal';
import React, { Component, Fragment } from 'react';
import Loader from 'Components/Loader';

import { getBookings } from '../../data/selectors';
import { getUserRole } from '../../../../data/auth/selectors';
import AngelSection from '../components/AngelSection';
import API from '../api';
import BookingInformation from '../components/BookingInformation';
import placeholder from 'Assets/images/profile-placeholder.png';
import { onBookingCancel } from '../../data/actions';

class AcceptedBooking extends Component {
  state = {
    booking: null,
  };

  componentDidMount() {
    this.findBooking();
  }

  findBooking = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        API.getBooking(Number(this.props.match.params.bookingId))
          .then(res => {
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
  };

  onEditBooking = () => {
    const { id, start_date, end_date, booking_dates } = this.state.booking;
    this.props.history.push('/booking/edit/' + id, {
      start_date,
      end_date,
      bookingDateId: booking_dates[0].id,
      bookingDates: booking_dates,
    });
  };

  onCancelBooking = () => {
    if (this.state.booking) {
      const data = {
        bookingId: this.state.booking.id,
        familyId: this.state.booking.family_id,
        reasons: this.state.booking.cancellation_reasons,
      };

      this.props.history.push(
        '/booking/cancellation/' + this.state.booking.id,
        data
      );
    }
  };

  togglePhoneModal = () => {
    this.setState({
      showPhoneModal: !this.state.showPhoneModal,
    });
  };

  render() {
    if (this.state.booking) {
      const {
        angel_data,
        start_date,
        end_date,
        id,
        family_id,
        created_at,
        expires_at,
        is_editable,
        current_state,
      } = this.state.booking;
      return (
        !this.state.isLoading && (
          <Fragment>
            <Navigation
              title="Booking"
              subTitle={
                <FormattedMessage
                  id="booking.accepted.subTitle"
                  values={{ familyId: family_id, bookingId: id }}
                />
              }
              onBack={this.props.history.goBack}
            />
            <PhoneModal
              open={this.state.showPhoneModal}
              toggle={this.togglePhoneModal}
            />

            <Segment basic vertical>
              <AngelSection
                angelId={angel_data[0].id}
                userId={angel_data[0].user_id}
                name={angel_data[0].first_name}
                phone={angel_data[0].first_name}
                img={angel_data[0].image ? angel_data[0].image : placeholder}
                age={getAge(angel_data[0].birthdate)}
                newMessage={angel_data[0].new_messages}
                history={this.props.history}
                togglePhoneModal={this.togglePhoneModal}
              />
            </Segment>

            <Grid container>
              <CustomRow>
                <CustomColumn padding="0 1rem 0 0" width={6}>
                  <InlineText bold primaryFont>
                    <FormattedMessage id="booking.accepted.start" />
                  </InlineText>
                </CustomColumn>
                <CustomColumn noPadding textAlign="right" width={7}>
                  <InlineText accentText bold primaryFont>
                    {moment(
                      this.props.role === 'family' ? start_date : created_at,
                      'YYYY-MM-DD HH:mm:ss'
                    ).format('ddd MMMM DD')}
                  </InlineText>
                </CustomColumn>
                <CustomColumn textAlign="right" padding="0 0 0 1rem" width={3}>
                  <InlineText accentText bold primaryFont>
                    {moment(
                      this.props.role === 'family' ? start_date : created_at,
                      'YYYY-MM-DD HH:mm:ss'
                    ).format('HH:mm')}
                  </InlineText>
                </CustomColumn>
              </CustomRow>
              <CustomRow>
                <CustomColumn padding="0 1rem 0 0" width={6}>
                  <InlineText bold primaryFont>
                    <FormattedMessage id="booking.accepted.end" />
                  </InlineText>
                </CustomColumn>
                <CustomColumn textAlign="right" padding="0 0 0 1rem" width={10}>
                  <InlineText accentText bold primaryFont>
                    {moment(
                      this.props.role === 'family' ? end_date : expires_at,
                      'YYYY-MM-DD HH:mm:ss'
                    ).format('HH:mm')}
                  </InlineText>
                </CustomColumn>
              </CustomRow>
            </Grid>

            {(current_state === 'accepted' ||
              current_state === 'pending_edit') && (
              <Segment basic vertical>
                <BookingInformation
                  booking={this.state.booking}
                  history={this.props.history}
                  onCancelBooking={this.onCancelBooking}
                  onEditBooking={this.onEditBooking}
                  isEditable={is_editable}
                />
              </Segment>
            )}
          </Fragment>
        )
      );
    }
    return <Loader />;
  }
}

const mapStateToProps = state => ({
  bookings: getBookings(state),
  role: getUserRole(state),
});

export default connect(
  mapStateToProps,
  {
    onBookingCancel,
  }
)(AcceptedBooking);
