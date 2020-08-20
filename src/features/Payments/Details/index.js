import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import moment from 'moment';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import { getRates, getPayments, getAngelPayments } from './selectors';
import { getUserRole } from '../../../data/auth/selectors';
import { onGetRates } from './actions';
import { getAge } from 'Utils';
import { LoadableFamilyProfile } from '../../AngelFamilies/routes';
import Profile from '../components/Profile';
import { FamilyTabBar, AngelTabBar } from 'Components/NavigationTabs';
import ConfirmationSection from '../components/ConfirmationSection';
import DateTimeValues from '../components/DateTimeValues';
import Review from '../components/Review';
import Transaction from '../components/Transaction';
import placeholder from 'Assets/images/familyProfilePlaceholder.png';

class Details extends Component {
  state = {
    payment: null,
  };

  static defaultProps = {
    rates: [],
    payments: [],
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (
      this.props.location.state.from !== 'payments' &&
      this.props.role === 'family'
    ) {
      this.props.onGetRates();
    } else {
      this.getPaymentById();
      LoadableFamilyProfile.preload();
    }
  }

  getPaymentById = () => {
    const id = this.props.match.params.paymentId;
    if (
      this.props.role === 'family' &&
      this.props.payments &&
      this.props.payments.length
    ) {
      return this.props.payments.find(payment => {
        return payment.id === Number(id);
      });
    } else if (
      this.props.role === 'angel' &&
      this.props.angelPayments &&
      this.props.angelPayments.length
    ) {
      return this.props.angelPayments.find(payment => {
        return payment.id === Number(id);
      });
    } else {
      return null;
    }
  };

  render() {
    console.log(this.props);
    const payment = this.getPaymentById();
    console.log('payment: ', payment);
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="payments.family.navTitle" />}
        navSubTitle={
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
        onNavBack={this.props.history.goBack}
        navRightComponent={() => (
          <CustomLink to="/faq">
            <FormattedMessage id="navigation.support" />
          </CustomLink>
        )}
      >
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            {payment && (
              <Grid container>
                <CustomRow padding="1rem 0 1.125rem 0">
                  {this.props.role === 'family' ? (
                    <Profile
                      name={payment.angel.first_name}
                      age={getAge(payment.angel.birthdate)}
                      img={payment.angel.image}
                      phone={payment.angel.phone}
                      id={payment.angel.id}
                      history={this.props.history}
                      role={this.props.role}
                      userId={payment.angel.user_id}
                    />
                  ) : (
                    <Profile
                      name={payment.family[0].last_name}
                      img={
                        payment.family[0].image
                          ? payment.family[0].image
                          : placeholder
                      }
                      phone={payment.family[0].phone}
                      id={payment.family[0].family_id}
                      history={this.props.history}
                      role={this.props.role}
                      userId={payment.family[0].user_id}
                    />
                  )}
                </CustomRow>
                <CustomRow padding="0 0 1.125rem 0">
                  <CustomColumn noPadding width={4}>
                    <InlineText primaryFont>
                      <FormattedMessage id="start" />
                    </InlineText>
                  </CustomColumn>
                  <CustomColumn textAlign="right" width={10}>
                    <DateTimeValues>
                      {moment(
                        payment.actual_start,
                        'YYYY-MM-DD HH:mm:ss'
                      ).format('dd. DD MMMM')}
                    </DateTimeValues>
                  </CustomColumn>
                  <CustomColumn noPadding textAlign="right" width={2}>
                    <DateTimeValues>
                      {moment(
                        payment.actual_start,
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
                      {moment(payment.actual_end, 'YYYY-MM-DD HH:mm:ss').format(
                        'HH:mm'
                      )}
                    </DateTimeValues>
                  </CustomColumn>
                </CustomRow>
                <CustomRow padding="0 0 1rem">
                  <Transaction
                    rates={
                      this.props.rates
                        ? this.props.rates
                        : payment.costs_summary.rates
                    }
                    role={this.props.role}
                    angelName={payment.angel.first_name}
                    creditUsed={payment.credit_used}
                    transactionCosts={payment.costs_summary.transaction}
                    tip={payment.tip}
                    totalTime={payment.total_hours}
                    warning={payment.chargeback_reason}
                    totalAmount={payment.total_amount}
                    fee={payment.fee}
                    state={payment.current_state}
                  />
                </CustomRow>
              </Grid>
            )}
            <Divider />
            {this.props.location.state &&
            this.props.location.state.from === 'payments' &&
            payment &&
            payment.rating ? (
              <Review
                rating={payment.rating.rating}
                review={payment.rating.comments}
              />
            ) : null}
            {/* {!this.state.payment.rating && (
                <RatingSection
                  stateOfPayment={this.state.payment.current_state}
                />
              )}
              {this.state.payment.rating ? (
                <Review
                  rating={this.state.payment.rating.rating}
                  review={this.state.payment.rating.comments}
                />
              ) : (
                <Review />
              )} */}
          </CustomColumn>
        </CustomRow>
        {payment && payment.current_state === 'chargeback' ? (
          <Confirmation>
            <ConfirmationSection
              paymentState={payment.current_state}
              sum={payment.total_amount}
              chargeLink={payment.payment_link}
            />
          </Confirmation>
        ) : this.props.role === 'family' ? (
          <FamilyTabBar />
        ) : (
          <AngelTabBar />
        )}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  rates: getRates(state),
  payments: getPayments(state),
  role: getUserRole(state),
  angelPayments: getAngelPayments(state),
});
const mapDispatchToProps = dispatch => ({
  onGetRates: () => dispatch(onGetRates()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
