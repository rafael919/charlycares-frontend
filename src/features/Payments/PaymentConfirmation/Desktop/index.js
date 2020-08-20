import { FormattedMessage } from 'react-intl';
import { getAge } from 'Utils';
import { Grid } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import { withRouter } from 'react-router-dom';
import { nearestMinutes } from '../../../../utils';
import DateTime from 'react-datetime';
import WithRole from 'Components/WithRole';
import DesktopTime from 'Components/DesktopTime';
import DesktopInput from 'Components/DesktopInput';
import Navigation from 'Components/Navigation';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Confirmation from 'Components/Confirmation';
import moment from 'moment';
import React from 'react';
import API from '../api';
import ConfirmationSection from '../../components/ConfirmationSection';
import Profile from '../../components/Profile';
import RatingSection from '../../components/RatingSection';
import Review from '../../components/Review';
import Transaction from '../components/Transaction';

class PaymentConfirmation extends React.PureComponent {
  constructor(props) {
    super(props);
    const startTime = nearestMinutes(
      5,
      moment(this.props.startTime.date, 'YYYY-MM-DD HH:mm:ss.SSSSSS')
    ).format('HH:mm');
    let tempStartTime = nearestMinutes(
      5,
      moment(this.props.startTime.date, 'YYYY-MM-DD HH:mm:ss.SSSSSS')
    ); 

    let tempEndTime = moment(); 
    
    if (tempEndTime > moment(this.props.startTime.date, 'YYYY-MM-DD HH:mm:ss.SSSSSS').add(23, 'hours')) {
      tempEndTime = moment(this.props.endTime.date, 'YYYY-MM-DD HH:mm:ss.SSSSSS'); 
    }

    if (tempEndTime < tempStartTime.clone().add(1, 'h')) {
      tempEndTime = tempStartTime.clone().add(1, 'h');
    }

    const endTime = nearestMinutes(
      5,
      tempEndTime).format('HH:mm');

    this.state = {
      isLoading: false,
      errors: null,
      rates: null,
      tip: 0,
      review: '',
      rating: 0,
      total: 0,
      initialTotal: 0,
      startDate: moment(
        this.props.startTime.date,
        'YYYY-MM-DD HH:mm:ss.SSSSSS'
      ).format('YYYY-MM-DD'),
      endDate: moment(
        this.props.endTime.date,
        'YYYY-MM-DD HH:mm:ss.SSSSSS'
      ).format('YYYY-MM-DD'),
      startTime,
      endTime,
      momentStart: tempStartTime, 
      momentEnd: tempEndTime,
      initialStartTime: startTime,
      initialEndTime: moment(
        this.props.startTime.date,
        'YYYY-MM-DD HH:mm:ss.SSSSSS'
      ).add(1, 'hour').format('HH:mm'),
    };
    this.fetchRates();
  }

  componentDidMount() {
    this.fetchRates();
  }

  fetchRates = (momentStart, momentEnd) => {
    let startDate = this.state.momentStart; 
    let endDate = this.state.momentEnd; 
    
    if(momentStart && momentEnd) {
      startDate = momentStart;
      endDate = momentEnd;
    } 

    if (startDate && endDate) {
      const startTimeTimestamp = startDate.format('X');
      const endTimeTimestamp = endDate.format('X');
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
      const total = rates.day_amount + rates.night_amount + parseFloat(this.props.transactionCosts) + rates.insurance_fee + rates.hotline_fee;
      return Number(total - Number(this.props.credit)).toFixed(2);
    }
    return 0;
  };

  onTipAndReviewChange = type => (e, data) => {
    e.persist();
    if (type === 'tip') {
      return this.setState(prevState => {
        return {
          tip: data.value,
          total: (Number(prevState.initialTotal) + Number(data.value)).toFixed(
            2
          ),
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


  onTimeChange = field => (e, data) => {
    let startDate = this.state.startDate; 
    let endTime = this.state.endTime; 
    let startTime = this.state.startTime; 

    if(field === 'startTime') {
      startTime = data.value;
    } 

    if(field === 'endTime') {
      endTime = data.value;
    }     

    let startDateMoment = moment(`${startDate} ${startTime}`, 'YYYY-MM-DD HH:mm'); 
    let endDateMoment = moment(`${startDate} ${endTime}`, 'YYYY-MM-DD HH:mm'); 

    if(startDateMoment > endDateMoment) {
      endDateMoment = endDateMoment.clone().add(1, 'day'); 
    }

    this.setState({
      startTime: startDateMoment.clone().format('HH:mm'), 
      endTime: endDateMoment.clone().format('HH:mm'), 
      startDate: startDateMoment.clone().format('YYYY-MM-DD'),
    }, () => { this.fetchRates(startDateMoment, endDateMoment) }); 
  };

  onDateChange = field => date => {
    this.setState({
      startDate: date.format('YYYY-MM-DD')
    });
  };


  postBookingFinish = () => {
    let startDate = moment(
        `${this.state.startDate} ${this.state.startTime}`,
        'YYYY-MM-DD HH:mm'
      );
    let endDate = moment(
        `${this.state.startDate} ${this.state.endTime}`,
        'YYYY-MM-DD HH:mm'
      ); 

    if(startDate > endDate) {
      endDate.add(1, 'day'); 
    }
    API.finishBooking({
      start_time: startDate.format('X'),
      end_time: endDate.format('X'),
      tip: this.state.tip,
      rating: this.state.rating,
      comments: this.state.review,
    })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/payments/success');
        }
        this.props.onClose(); 
        this.props.onEndSitting(); 
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

  render() {
    const { payment } = this.state;
    return (
      <React.Fragment>
        <Navigation
          title={<FormattedMessage id="booking.family.details.navTitle" />}
          subTitle={
            payment ? (
              this.props.role === 'family' ? (
                <FormattedMessage
                  id="payments.family.subtitleTitle"
                  values={{
                    id: payment.invoice_number,
                    prefix: payment.invoice_prefix,
                  }}
                />
              ) : (
                <FormattedMessage
                  id="payments.angel.details.subTitle"
                  values={{
                    familyId: payment.family[0].id,
                    bookingId: payment.booking_id,
                  }}
                />
              )
            ) : null
          }
          noPadding
          style={{    
            position: 'sticky',
            top: 0,
            zIndex: 99,
            background: 'white'}}
          onClose={this.props.onClose}
        />
        <CustomRow noPadding>
          <CustomColumn noPadding>
            {this.props.angel && (
              <Grid container>
                <CustomRow padding="1rem 0 1.125rem 0">
                  <WithRole>
                    {role => (
                      <Profile
                        name={this.props.angel.first_name}
                        age={getAge(this.props.angel.birthdate)}
                        img={this.props.angel.image}
                        phone={this.props.angel.phone}
                        id={this.props.angel.id}
                        userId={this.props.angel.user_id}
                        history={this.props.history}
                        role={role}
                        closeModal={this.props.onClose}
                        togglePhoneModal={this.props.togglePhoneModal}
                      />
                    )}
                  </WithRole>
                </CustomRow>
                <CustomRow padding="0 0 1.125rem 0">
                  <CustomColumn noPadding width={4} verticalAlign="middle">
                    <InlineText primaryFont>
                      <FormattedMessage id="start" />
                    </InlineText>
                  </CustomColumn>
                  <CustomColumn
                    noPadding
                    textAlign="right"
                    width={8}
                    verticalAlign="middle"
                  >
                    <DateTime
                      dateFormat="dd. DD MMMM"
                      timeFormat={false}
                      closeOnSelect
                      onChange={this.onDateChange('startDate')}
                      renderInput={props => <DesktopInput {...props} />}
                      className="rdt-relative"
                      value={moment(this.state.startDate, 'YYYY-MM-DD')}
                      inputProps={{
                        name: 'startDate',
                      }}
                    />
                  </CustomColumn>
                  <CustomColumn
                    noPadding
                    textAlign="right"
                    width={4}
                    verticalAlign="middle"
                  >
                    <DesktopTime
                      date={moment(this.state.startDate)}
                      startTime={this.state.initialStartTime}
                      value={this.state.startTime}
                      type="start"
                      interval={5}
                      name="startTime"
                      onChange={this.onTimeChange('startTime')}
                      startDate={this.state.startDate}
                      hoursBeforeStart={6}
                    />
                  </CustomColumn>
                </CustomRow>
                <CustomRow padding="0 0 1.125rem 0">
                  <CustomColumn noPadding width={4} verticalAlign="middle">
                    <InlineText primaryFont>
                      <FormattedMessage id="end" />
                    </InlineText>
                  </CustomColumn>
                  <CustomColumn
                    noPadding
                    textAlign="right"
                    width={8}
                    verticalAlign="middle"
                  >
                  </CustomColumn>
                  <CustomColumn
                    noPadding
                    textAlign="right"
                    width={4}
                    verticalAlign="middle"
                  >
                    <DesktopTime
                      date={moment(this.state.endDate)}
                      startTime={this.state.initialEndTime}
                      value={this.state.endTime}
                      type="start"
                      interval={5}
                      name="endTime"
                      onChange={this.onTimeChange('endTime')}
                      startDate={this.state.startDate}
                    />
                  </CustomColumn>
                </CustomRow>
                <CustomRow padding="0 0 1rem">
                  {this.state.rates && (
                    <WithRole>
                      {role => (
                        <Transaction
                          rates={this.state.rates}
                          role={role}
                          angelName={this.props.angel.first_name}
                          creditUsed={this.props.credit}
                          transactionCosts={this.props.transactionCosts}
                          tip={this.state.tip}
                          totalTime={this.getTotalTime()}
                          totalAmount={this.state.total}
                          onTipChange={this.onTipAndReviewChange('tip')}
                        />
                      )}
                    </WithRole>
                  )}
                </CustomRow>
              </Grid>
            )}
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
        <Confirmation nonSticky>
          <ConfirmationSection
            formIsValid={this.state.rating > 0}
            onSubmit={this.onBookingFinish}
            sum={this.state.total}
          />
        </Confirmation>
      </React.Fragment>
    );
  }
}

export default withRouter(PaymentConfirmation);
