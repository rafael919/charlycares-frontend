import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAge } from 'Utils';
import { Grid, Segment, Divider } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import moment from 'moment';
import Navigation from 'Components/Navigation';
import React, { Component } from 'react';

import { getRates, getPayments, getAngelPayments } from '../selectors';
import { getUserRole } from '../../../../data/auth/selectors';
import { LoadableFamilyProfile } from '../../../AngelFamilies/routes';
import { onGetRates } from '../actions';
import DateTimeValues from '../../components/DateTimeValues';
import Profile from '../../components/Profile';
import Review from '../../components/Review';
import Transaction from '../../components/Transaction';
import PhoneModal from 'Components/PhoneModal';
import placeholder from 'Assets/images/familyProfilePlaceholder.png';

class Details extends Component {
  state = {
    payment: null,
  };

  static defaultProps = {
    rates: [],
    payments: [],
    angelPayments: [],
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    LoadableFamilyProfile.preload();
    if (
      this.props.location.state.from !== 'payments' &&
      this.props.role === 'family'
    ) {
      this.props.onGetRates();
    } else {
      this.getPaymentById();
    }
  }

  getPaymentById = () => {
    let data;

    if (this.props.role === 'angel') {
      if (!this.props.angelPayments || !this.props.angelPayments.length) {
        this.props.history.push('/payments');
      }
      data = this.props.angelPayments.find(payment => {
        return payment.id === Number(this.props.match.params.paymentId);
      });
    } else {
      if (!this.props.payments || !this.props.payments.length) {
        this.props.history.push('/payments');
      }
      data = this.props.payments.find(payment => {
        return payment.id === Number(this.props.match.params.paymentId);
      });
    }

    this.setState({
      payment: data,
    });
  };

  togglePhoneModal = () => {
    this.setState({
      showPhoneModal: !this.state.showPhoneModal,
    });
  };

  render() {
    const { payment } = this.state;

    return payment ? (
      <React.Fragment>
        <PhoneModal
          open={this.state.showPhoneModal}
          toggle={this.togglePhoneModal}
        />
        <Navigation
          onBack={this.props.history.goBack}
          title={<FormattedMessage id="payments.family.navTitle" />}
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
        />
        <Segment basic vertical>
          {this.props.role === 'family' ? (
            <Profile
              name={payment.angel.first_name}
              age={getAge(payment.angel.birthdate)}
              img={payment.angel.image}
              phone={payment.angel.phone}
              id={payment.angel.id}
              history={this.props.history}
              role={this.props.role}
              togglePhoneModal={this.togglePhoneModal}
              userId={payment.angel.user_id}
            />
          ) : (
            <Profile
              name={payment.family[0].last_name}
              img={
                payment.family[0].image ? payment.family[0].image : placeholder
              }
              phone={payment.family[0].phone}
              id={payment.family[0].family_id}
              history={this.props.history}
              role={this.props.role}
              userId={payment.family[0].user_id}
            />
          )}
        </Segment>
        <Segment basic vertical>
          <Grid columns={2}>
            <Grid.Column width={5}>
              <InlineText primaryFont>
                <FormattedMessage id="start" />
              </InlineText>
            </Grid.Column>
            {/* <Grid.Column width={6}>
              <DateTimeValues>
                {moment(payment.actual_start, 'YYYY-MM-DD HH:mm:ss').format(
                  'dd. DD MMMM'
                )}
              </DateTimeValues>
            </Grid.Column> */}
            <Grid.Column textAlign="right" width={11}>
              <div style={{ display: 'inline-flex', textAlign: 'right' }}>
                <div>
                  <DateTimeValues>
                    {moment(payment.actual_start, 'YYYY-MM-DD HH:mm:ss').format(
                      'dd. DD MMMM'
                    )}
                  </DateTimeValues>
                </div>
                <div style={{ marginLeft: 30 }}>
                  <DateTimeValues>
                    {moment(payment.actual_start, 'YYYY-MM-DD HH:mm:ss').format(
                      'HH:mm'
                    )}
                  </DateTimeValues>
                </div>
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment basic vertical>
          <Grid columns={2}>
            <Grid.Column width={5}>
              <InlineText primaryFont>
                <FormattedMessage id="end" />
              </InlineText>
            </Grid.Column>
            <Grid.Column textAlign="right" width={11}>
              <div style={{ display: 'inline-flex', textAlign: 'right' }}>
                <div>
                  <DateTimeValues>
                    {moment(payment.actual_end, 'YYYY-MM-DD HH:mm:ss').format(
                      'dd. DD MMMM'
                    )}
                  </DateTimeValues>
                </div>
                <div style={{ marginLeft: 30 }}>
                  <DateTimeValues>
                    {moment(payment.actual_end, 'YYYY-MM-DD HH:mm:ss').format(
                      'HH:mm'
                    )}
                  </DateTimeValues>
                </div>
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
        <Divider fitted />
        <Segment basic vertical>
          <Transaction
            rates={
              this.props.rates
                ? this.props.rates
                : this.state.payment.costs_summary.rates
            }
            role={this.props.role}
            angelName={this.state.payment.angel.first_name}
            creditUsed={this.state.payment.credit_used}
            transactionCosts={this.state.payment.costs_summary.transaction}
            tip={this.state.payment.tip}
            totalTime={this.state.payment.total_hours}
            warning={this.state.payment.chargeback_reason}
            totalAmount={this.state.payment.total_amount}
            fee={this.state.payment.fee}
            state={this.state.payment.current_state}
          />
        </Segment>
        <Divider />
        {this.props.location.state.from === 'payments' &&
        this.state.payment &&
        this.state.payment.rating ? (
          <Review
            rating={this.state.payment.rating.rating}
            review={this.state.payment.rating.comments}
          />
        ) : null}
      </React.Fragment>
    ) : null;
  }
}

const mapStateToProps = state => ({
  rates: getRates(state),
  payments: getPayments(state),
  angelPayments: getAngelPayments(state),
  role: getUserRole(state),
});
const mapDispatchToProps = dispatch => ({
  onGetRates: () => dispatch(onGetRates()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
