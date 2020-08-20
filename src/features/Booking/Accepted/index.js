import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAge } from 'Utils';
import { Grid } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import EmptyCell from 'Components/EmptyCell';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import moment from 'moment';
import React from 'react';

import { getBookings } from '../data/selectors';
import { getUserRole } from '../../../data/auth/selectors';
import AngelSection from './components/AngelSection';
import API from './api';
import BookingInformation from './components/BookingInformation';
import placeholder from 'Assets/images/profile-placeholder.png';

class AcceptedBooking extends React.Component {
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

  render() {
    if (!this.state.booking) return <Loader />;
    const {
      angel_data,
      start_date,
      end_date,
      id,
      family_id,
      family_data,
      created_at,
      expires_at,
      message,
      is_editable,
      current_state,
    } = this.state.booking;
    return (
      <Layout
        onNavBack={this.props.history.goBack}
        navTitle="Booking"
        navSubTitle={
          <FormattedMessage
            id="booking.accepted.subTitle"
            values={{ familyId: family_id, bookingId: id }}
          />
        }
        navRightComponent={() => (
          <CustomLink to="/faq" primary>
            <FormattedMessage id="navigation.support" />
          </CustomLink>
        )}
      >
        <ContentWrapper>
          <CustomRow padding="1rem 0 1rem 0">
            <Divider />
            <Grid container>
              <CustomRow>
                <CustomColumn noPadding>
                  {this.props.role === 'family' &&
                  angel_data &&
                  angel_data[0] ? (
                    <AngelSection
                      angelId={angel_data ? angel_data[0].id : null}
                      userId={angel_data[0].user_id}
                      name={angel_data ? angel_data[0].first_name : null}
                      phone={angel_data ? angel_data[0].phone : null}
                      img={angel_data ? angel_data[0].image : placeholder}
                      newMessage={angel_data ? angel_data[0].new_messages : null}
                      age={getAge(angel_data ? angel_data[0].birthdate : null)}
                      history={this.props.history}
                    />
                  ) : this.props.role === 'angel' &&
                    family_data &&
                    family_data[0] ? (
                    <AngelSection
                      angelId={family_data[0].id}
                      name={family_data[0].first_name}
                      phone={family_data[0].phone}
                      img={
                        family_data[0].image
                          ? family_data[0].image
                          : placeholder
                      }
                      age={getAge(family_data[0].birthdate)}
                      history={this.props.history}
                    />
                  ) : null}
                </CustomColumn>
              </CustomRow>
              <CustomRow noPadding>
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
              {(current_state === 'accepted' ||
                current_state === 'pending_edit') && (
                <CustomRow padding="1rem 0 0 0">
                  <CustomColumn noPadding>
                    <BookingInformation
                      startDate={start_date}
                      message={message ? message : ''}
                      onEditBooking={this.onEditBooking}
                      onCancelBooking={this.onCancelBooking}
                      isEditable={is_editable}
                    />
                  </CustomColumn>
                </CustomRow>
              )}
            </Grid>
          </CustomRow>
          <EmptyCell />
        </ContentWrapper>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
  bookings: getBookings(state),
  role: getUserRole(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AcceptedBooking);
