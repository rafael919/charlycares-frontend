import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAge } from 'Utils';
import { Grid, Divider } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import moment from 'moment';
import React, { Fragment } from 'react';
import Navigation from 'Components/Navigation';

import { getBookings } from '../../data/selectors';
import AngelSection from '../components/AngelSection';
import DateTimeValues from '../components/DateTimeValues';
import API from '../api';
import Review from '../components/Review';
import Transaction from '../components/Transaction';
import placeholder from 'Assets/images/profile-placeholder.png';

class Details extends React.Component {
  state = {
    booking: {},
    error: null,
    isLoading: false,
  };

  static defaultProps = {
    bookings: [],
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

  renderAngels = () => {
    if (
      this.state.booking &&
      this.state.booking.invitations &&
      this.state.booking.invitations.length
    ) {
      return this.state.booking.invitations.map(
        ({ angel_data, current_state }) => {
          if (current_state === 'accepted') {
            return (
              <AngelSection
                angelId={angel_data[0].id}
                key={angel_data[0].id}
                name={angel_data[0].first_name}
                phone={angel_data[0].phone}
                img={angel_data[0].image ? angel_data[0].image : placeholder}
                age={getAge(angel_data[0].birthdate)}
                history={this.props.history}
              />
            );
          }
          return null;
        }
      );
    }
    return null;
  };

  render() {
    const {
      booking_dates,
      family_id,
      payment,
      normal_rate,
      extra_rate,
      rating,
    } = this.state.booking;
    return (
      <Fragment>
        <Navigation
          title={<FormattedMessage id="booking.family.details.navTitle" />}
          subTitle={
            <FormattedMessage
              id="booking.family.details.subTitle"
              values={{
                bookingId: this.props.match.params.bookingId,
                familyId: family_id && family_id,
              }}
            />
          }
          onBack={this.props.history.goBack}
        />
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Grid container>
              <CustomRow padding="1rem 0 1.125rem 0">
                {this.renderAngels()}
              </CustomRow>
              <CustomRow padding="0 0 1.125rem 0">
                <CustomColumn noPadding width={4}>
                  <InlineText primaryFont>
                    <FormattedMessage id="start" />
                  </InlineText>
                </CustomColumn>
                <CustomColumn textAlign="right" width={10}>
                  <DateTimeValues>
                    {booking_dates &&
                      moment(
                        booking_dates[0].start_date,
                        'YYYY-MM-DD HH:mm:ss'
                      ).format('dd. DD MMMM')}
                  </DateTimeValues>
                </CustomColumn>
                <CustomColumn noPadding textAlign="right" width={2}>
                  <DateTimeValues>
                    {booking_dates &&
                      moment(
                        booking_dates[0].start_date,
                        'YYYY-MM-DD HH:mm:ss'
                      ).format('HH:mm')}
                  </DateTimeValues>
                </CustomColumn>
              </CustomRow>
              <CustomRow padding="0 0 1.125rem 0">
                <CustomColumn noPadding width={2}>
                  <InlineText primaryFont>
                    <FormattedMessage id="end" />
                  </InlineText>
                </CustomColumn>
                <CustomColumn noPadding textAlign="right" width={14}>
                  <DateTimeValues>
                    {booking_dates &&
                      moment(
                        booking_dates[0].end_date,
                        'YYYY-MM-DD HH:mm:ss'
                      ).format('HH:mm')}
                  </DateTimeValues>
                </CustomColumn>
              </CustomRow>
              <CustomRow>
                {payment && normal_rate && extra_rate ? (
                  <Transaction
                    payment={payment}
                    normalRate={normal_rate}
                    extraRate={extra_rate}
                  />
                ) : null}
              </CustomRow>
            </Grid>
            <Divider fitted />
            {rating ? <Review review={rating} /> : null}
          </CustomColumn>
        </CustomRow>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  bookings: getBookings(state),
});

export default connect(mapStateToProps)(Details);
