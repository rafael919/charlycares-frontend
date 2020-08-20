import { connect } from 'react-redux';
import { PaymentsLoader } from 'Components/Progressive';
import { Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import curry from 'ramda/es/curry';
import Divider from 'Components/Divider';
import DesktopError from 'Components/DesktopError';
import memoizeWith from 'ramda/es/memoizeWith';
import moment from 'moment';
import React, { Component } from 'react';

import {
  getPaidPayments,
  getChargeBackPayments,
  getCredit,
} from '../selectors';
import { onGetPayments } from '../action';
import PaymentItem from '../../components/PaymentItem';
import PaymentsList from '../components/PaymentsList';
import Promo from '../components/Promo';
import Total from '../components/Total';
import { getLoadingStatus, getErrors } from '../../../../ui/selectors';
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
      this.props.history.push('/payments/payment/' + id, { from: 'payments' });
    })
  );

  goToPromo = () => {
    this.props.history.push('/profile/credit');
  };

  render() {
    return (
      <React.Fragment>
        <DesktopError
          errors={this.props.errors}
          onRetry={this.props.getPayments}
        />
        <Segment basic vertical>
          {this.props.credit && (
            <Promo credit={this.props.credit} goToPromo={this.goToPromo} />
          )}
          <PaymentsLoader
            copies={10}
            isLoading={
              this.props.isLoading &&
              this.props.location.pathname === '/payments'
            }
          />
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
                date={moment(payment.created_at, 'YYYY-MM-DD HH:mm:ss').format(
                  'MMMM DD, YYYY'
                )}
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

          <Divider />
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
                date={moment(payment.created_at, 'YYYY-MM-DD HH:mm:ss').format(
                  'MMMM DD, YYYY'
                )}
                sum={payment.total_amount}
                paymentDesc={payment.current_state}
                divider
              />
            ))}
          </PaymentsList>
          {this.props.paidPayments.length === 0 && <EmptyList 
            id="payment.home.noPayments"
          />}
        </Segment>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  paidPayments: getPaidPayments(state),
  chargeBackPayments: getChargeBackPayments(state),
  credit: getCredit(state),
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
});

const mapDispatchToProps = dispatch => ({
  getPayments: () => dispatch(onGetPayments()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PaymentsHome)
);
