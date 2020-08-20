import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAge } from 'Utils';
import { Grid } from 'semantic-ui-react';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import MobileTimeSelection from 'Components/MobileTimeSelection';
import CustomLink from 'Components/CustomLink';
import Loader from 'Components/Loader';
import Error from 'Components/Error';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import moment from 'moment';
import React from 'react';

import { getUserRole } from '../../../data/auth/selectors';
import API from './api';
import ConfirmationSection from '../components/ConfirmationSection';
import Profile from '../components/Profile';
import RatingSection from '../components/RatingSection';
import Review from '../components/Review';
import Transaction from './components/Transaction';
import NextStep from './components/NextStep';

class PaymentConfirmation extends React.PureComponent {
  constructor(props) {
    super(props);

    const startTime = moment(
      this.props.location.state.startTime,
      'YYYY-MM-DD HH:mm:ss.SSSSSS'
    );

    let tempEndTime = moment();

    if (tempEndTime > startTime.clone().add(23, 'hours')) {
      tempEndTime = moment(
        this.props.location.state.endTime,
        'YYYY-MM-DD HH:mm:ss.SSSSSS'
      );
    }

    if (tempEndTime < startTime.clone().add(1, 'h')) {
      tempEndTime = startTime.clone().add(1, 'h');
    }

    this.state = {
      isLoading: false,
      errors: null,
      rates: null,
      tip: 0,
      review: '',
      rating: 0,
      total: 0,
      initialTotal: 0,
      initialStartTime: startTime,
      startTime: startTime,
      endTime: tempEndTime,
    };
  }

  componentDidMount() {
    this.fetchRates();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.startTime !== prevState.startTime ||
      this.state.endTime !== prevState.endTime
    ) {
      this.fetchRates(
        this.state.startTime.clone().format('X'),
        this.state.endTime.clone().format('X')
      );
    }
  }

  fetchRates = () => {
    const format = 'YYYY-MM-DD HH:mm:ss.SSSSSS';
    const { startTime, endTime } = this.state;
    if (startTime && endTime) {
      const startTimeTimestamp = moment(startTime, format).format('X');
      const endTimeTimestamp = moment(endTime, format).format('X');
      this.setState(
        {
          isLoading: true,
        },
        () => {
          API.getRates(startTimeTimestamp, endTimeTimestamp)
            .then(res => {
              const total = this.getTotalAmount(res.data.data.rates);
              this.setState({
                rates: res.data.data.rates,
                initialTotal: total,
                isLoading: false,
                total,
              });
            })
            .catch(err => {
              this.setState({
                errors: err,
                isLoading: false,
              });
            });
        }
      );
    }
  };

  getTotalTime = () => {
    if (this.state.rates) {
      const dayTime = this.state.rates.day_length.split(':');
      const nightTime = this.state.rates.night_length.split(':');

      return `${Number(dayTime[0]) + Number(nightTime[0])}:${Number(
        dayTime[1]
      ) + Number(nightTime[1])}`;
    }
    return '';
  };

  getTotalAmount = rates => {
    if (rates) {
      const total =
        rates.day_amount +
        rates.night_amount +
        parseFloat(this.props.location.state.transactionCosts) +
        rates.insurance_fee +
        rates.hotline_fee;
      return Number(total - Number(this.props.location.state.credit)).toFixed(
        2
      );
    }
    return 0;
  };

  onTipAndReviewChange = type => e => {
    e.persist();
    if (type === 'tip') {
      return this.setState(prevState => {
        return {
          tip: e.target.value,
          total: (
            Number(prevState.initialTotal) + Number(e.target.value)
          ).toFixed(2),
        };
      });
    }
    return this.setState({
      [type]: e.target.value,
    });
  };

  onRatingChange = (_, data) => {
    this.setState({
      rating: data.rating,
    });
  };

  onDateChange = type => e => {
    if (type === 'startTime') {
      return this.setState({
        tempStartTime: e.target.value,
      });
    }
    return this.setState({
      tempEndTime: e.target.value,
    });
  };

  onTimeBlur = type => () => {
    return this.setState(prevState => {
      const diff = moment(prevState.tempEndTime, this.format).diff(
        moment(prevState.tempStartTime, this.format),
        'hours'
      );
      if (diff < 2) {
        if (type === 'startTime') {
          return {
            startTime: prevState.tempStartTime,
            endTime: moment(prevState.tempStartTime, this.format).add(
              2,
              'hours'
            ),
          };
        } else {
          return {
            startTime: moment(prevState.tempEndTime, this.format).subtract(
              2,
              'hours'
            ),
            endTime: prevState.tempEndTime,
          };
        }
      }
      return {
        [type]: prevState.tempStartTime,
      };
    });
  };

  postBookingFinish = () => {
    API.finishBooking({
      start_time: this.state.startTime.format('X'),
      end_time: this.state.endTime.format('X'),
      tip: this.state.tip,
      rating: this.state.rating,
      comments: this.state.review,
    })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/payments/success');
        }
      })
      .catch(err => {
        this.setState({
          errors: err,
          isLoading: false,
        });
      });
  };

  onBookingFinish = () => {
    if (this.state.rating > 0) {
      this.setState(
        {
          isLoading: true,
        },
        this.postBookingFinish
      );
    }
  };

  onErrorConfirm = () => {
    this.setState({
      errors: null,
    });
  };

  onTimeChange = ({ startTime, endTime }) => {
    this.setState({
      startTime,
      endTime,
    });
  };

  scrollToRatings = () => {
    document
      .querySelector('#ratingSection')
      .scrollIntoView({behavior: "smooth"});

    this.setState({
      scrolledToRating: true
    });
  }
  render() {
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="payments.family.navTitle" />}
        onNavBack={this.props.history.goBack}
        navRightComponent={() => (
          <CustomLink to="/faq">
            <FormattedMessage id="navigation.support" />
          </CustomLink>
        )}
      >
        {this.state.isLoading && <Loader isLoading={this.state.isLoading} />}
        <Error
          errors={this.state.errors}
          onErrorConfirm={this.onErrorConfirm}
        />
        <CustomRow noPadding>
          <CustomColumn noPadding>
            {this.props.location.state.angel && (
              <Grid container>
                <CustomRow padding="1rem 0 1.125rem 0">
                  <Profile
                    name={this.props.location.state.angel.first_name}
                    age={getAge(this.props.location.state.angel.birthdate)}
                    img={this.props.location.state.angel.image}
                    phone={this.props.location.state.angel.phone}
                    id={this.props.location.state.angel.id}
                    userId={this.props.location.state.angel.user_id}
                    history={this.props.history}
                    role={this.props.role}
                  />
                </CustomRow>
                <CustomRow padding="0 0 1.125rem 0">
                  <Grid>
                    <MobileTimeSelection
                      startTime={this.state.startTime}
                      endTime={this.state.endTime}
                      initialStartTime={this.state.initialStartTime}
                      onTimeChange={this.onTimeChange}
                      hoursBeforeStartDate={6}
                    />
                  </Grid>
                </CustomRow>
                <CustomRow padding="0 0 1rem">
                  {this.state.rates && (
                    <Transaction
                      rates={this.state.rates}
                      role={this.props.role}
                      angelName={this.props.location.state.angel.first_name}
                      creditUsed={this.props.location.state.credit}
                      transactionCosts={
                        this.props.location.state.transactionCosts
                      }
                      tip={this.state.tip}
                      totalTime={this.getTotalTime()}
                      totalAmount={this.state.total}
                      onTipChange={this.onTipAndReviewChange('tip')}
                    />
                  )}
                </CustomRow>
              </Grid>
            )}
            <Divider />
            <RatingSection
              onRatingChange={this.onRatingChange}
              rating={this.state.rating}
            />
            <Review
              onReviewChange={this.onTipAndReviewChange('review')}
              review={this.state.review}
            />
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          {(this.state.rating || this.state.scrolledToRating) ? <ConfirmationSection
            formIsValid={this.state.rating > 0}
            onSubmit={this.onBookingFinish}
            sum={this.state.total}
          /> : <NextStep scrollIntoView={this.scrollToRatings} /> }
        </Confirmation>
      </Layout>
    );
  }
}

export default connect(state => ({
  role: getUserRole(state),
}))(PaymentConfirmation);
