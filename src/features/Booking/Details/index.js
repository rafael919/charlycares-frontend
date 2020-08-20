import { FamilyTabBar } from 'Components/NavigationTabs';
import { FormattedMessage } from 'react-intl';
import { getAge } from 'Utils';
import { Grid } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import moment from 'moment';
import React from 'react';

import AngelSection from './components/AngelSection';
import API from './api';
import DateTimeValues from './components/DateTimeValues';
import Review from './components/Review';
import Transaction from './components/Transaction';
import placeholder from 'Assets/images/profile-placeholder.png';

class Details extends React.Component {
  state = {
    booking: null,
    error: null,
    isLoading: false,
  };

  static defaultProps = {
    bookings: [],
  };

  componentDidMount() {
    this.getBooking();
  }

  getBooking = () => {
    this.setState(
      state => ({
        isLoading: true,
      }),
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

  onErrorConfirm = () => {
    this.setState({
      error: null,
    });
  };

  render() {
    const { booking, isLoading } = this.state;
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="booking.family.details.navTitle" />}
        navSubTitle={
          <FormattedMessage
            id="booking.family.details.subTitle"
            values={{
              bookingId: this.props.match.params.bookingId,
              familyId: booking && booking.family_id,
            }}
          />
        }
        onNavBack={this.props.history.goBack}
        navRightComponent={() => {
          return (
            <CustomLink to="/faq">
              <FormattedMessage id="navigation.support" />
            </CustomLink>
          );
        }}
      >
        {isLoading ? <Loader /> : null}
        <Error errors={this.state.error} onErrorConfirm={this.onErrorConfirm} />
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
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
                    {booking &&
                      moment(
                        booking.booking_dates[0].start_date,
                        'YYYY-MM-DD HH:mm:ss'
                      ).format('dd. DD MMMM')}
                  </DateTimeValues>
                </CustomColumn>
                <CustomColumn noPadding textAlign="right" width={2}>
                  <DateTimeValues>
                    {booking &&
                      moment(
                        booking.booking_dates[0].start_date,
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
                    {booking &&
                      moment(
                        booking.booking_dates[0].end_date,
                        'YYYY-MM-DD HH:mm:ss'
                      ).format('HH:mm')}
                  </DateTimeValues>
                </CustomColumn>
              </CustomRow>
              <CustomRow>
                {booking &&
                booking.payment &&
                booking.normal_rate &&
                booking.extra_rate ? (
                  <Transaction
                    payment={booking.payment}
                    normalRate={booking.normal_rate}
                    extraRate={booking.extra_rate}
                  />
                ) : null}
              </CustomRow>
            </Grid>
            <Divider />
            {booking && booking.rating ? (
              <Review review={booking.rating} />
            ) : null}
          </CustomColumn>
        </CustomRow>
        <FamilyTabBar />
      </Layout>
    );
  }
}

export default Details;
