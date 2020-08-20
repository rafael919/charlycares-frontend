import { connect } from 'react-redux';
import { FamilyTabBar } from 'Components/NavigationTabs';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import curry from 'ramda/es/curry';
import memoizeWith from 'ramda/es/memoizeWith';
import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import CustomLink from 'Components/CustomLink';
import Divider from 'Components/Divider';
import EmptyCell from 'Components/EmptyCell';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import { getPaidPayments, getChargeBackPayments, getCredit } from './selectors';
import { onGetPayments } from './action';
import PaymentItem from '../components/PaymentItem';
import PaymentsList from './components/PaymentsList';
import Promo from './components/Promo';
import Total from './components/Total';
import EmptyList from 'Components/EmptyList';

class PaymentsHome extends Component {
  static defaultProps = {
    paidPayments: [],
    chargeBackPayments: [],
  };

  componentDidMount() {
    this.props.getPayments();
  }

  onPaymentSelect = memoizeWith(
    id => id,
    curry((id, _ev) => {
      this.props.history.push('/payments/payment/' + id, { from: 'payments' });
    })
  );

  goToPromo = () => {
    this.props.history.push('/profile/credit');
  };

  render() {
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="payments.family.home.navTitle" />}
        navRightComponent={() => (
          <CustomLink to="/payments/pdf"><FormattedMessage id="payments.family.home.createPdfBtn" /></CustomLink>
        )}
      >
        <ContentWrapper>
          <CustomRow noPadding>
            <CustomColumn noPadding>
              <Divider />
              {this.props.paidPayments.length === 0 && (
                <EmptyList id="payment.home.noPayments" />
              )}
              {this.props.credit && (
                <Promo credit={this.props.credit} goToPromo={this.goToPromo} />
              )}
              <PaymentsList>
                {this.props.chargeBackPayments.map(payment => (
                  <PaymentItem
                    onSelect={this.onPaymentSelect(payment.id)}
                    key={payment.id}
                    img={payment.angel.image}
                    description={moment(
                      payment.created_at,
                      'YYYY-MM-DD HH:mm:ss'
                    ).format('dddd')}
                    date={moment(
                      payment.created_at,
                      'YYYY-MM-DD HH:mm:ss'
                    ).format('MMMM DD, YYYY')}
                    sum={payment.total_amount}
                    warning={payment.chargeback_reason}
                    border
                  />
                ))}
              </PaymentsList>
              {this.props.chargeBackPayments[0] && (
                <Total
                  paymentLink={this.props.chargeBackPayments[0].payment_link}
                  chargeBackPayments={this.props.chargeBackPayments}
                />
              )}

              <PaymentsList>
                {this.props.paidPayments.map(payment => (
                  <PaymentItem
                    onSelect={this.onPaymentSelect(payment.id)}
                    key={payment.id}
                    img={payment.angel.image}
                    description={moment(
                      payment.created_at,
                      'YYYY-MM-DD HH:mm:ss'
                    ).format('dddd')}
                    date={moment(
                      payment.created_at,
                      'YYYY-MM-DD HH:mm:ss'
                    ).format('MMMM DD, YYYY')}
                    sum={payment.total_amount}
                    paymentDesc={payment.current_state}
                    divider
                  />
                ))}
              </PaymentsList>
            </CustomColumn>
          </CustomRow>
          <EmptyCell padding="0 0 7rem" />
        </ContentWrapper>
        <FamilyTabBar />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  paidPayments: getPaidPayments(state),
  chargeBackPayments: getChargeBackPayments(state),
  credit: getCredit(state),
});

const mapDispatchToProps = dispatch => ({
  getPayments: () => dispatch(onGetPayments()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentsHome);
