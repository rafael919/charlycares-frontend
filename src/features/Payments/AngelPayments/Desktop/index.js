import { connect } from 'react-redux';
import { ProgressivePayments } from 'Components/Progressive';
import { Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import curry from 'ramda/es/curry';
import DesktopError from 'Components/DesktopError';
import InfiniteScroll from 'react-infinite-scroller';
import memoizeWith from 'ramda/es/memoizeWith';
import moment from 'moment';
import React from 'react';
import ScrollerLoader from 'Components/ScrollerLoader';

import {
  getAngelPayments,
  getAngelPaymentsTotal,
  getAngelCredit,
} from '../selectors';
import { getLoadingStatus, getErrors } from '../../../../ui/selectors';
import { onGetAngelPayments } from '../actions';
import PaymentItem from '../../components/PaymentItem';
import PaymentsList from '../components/PaymentsList';
import Promo from '../components/Promo';
import Sorting from '../components/Sorting';
import placeholder from 'Assets/images/familyProfilePlaceholder.png';

class AngelPayments extends React.Component {
  static defaultProps = {
    payments: [],
  };

  state = {
    hasMore: true,
    totalNumOfPages: 0,
    jumpBy: 5,
    payments: [],
    currentIndex: 0,
    selectedYear: null,
  };

  componentDidMount() {
    this.props.onGetAngelPayments();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.totalNumOfPages === 0 &&
      this.props.payments !== prevProps.payments
    ) {
      this.setState({
        totalNumOfPages: Math.ceil(
          this.props.payments.length / this.state.jumpBy
        ),
        selectedYear: this.props.totalPerYear[
          this.props.totalPerYear.length - 1
        ],
      });
    }
  }

  getMomentDate(date) {
    return moment(date);
  }

  renderPaymentsList = () => {
    return this.state.payments.map(payment => {
      const date = moment(payment.start_date, 'YYYY-MM-DD HH:mm:ss');
      return (
        <PaymentItem
          key={payment.id}
          angel
          onSelect={this.onPaymentSelect(payment.id)}
          img={payment.family[0].image ? payment.family[0].image : placeholder}
          divider
          description={date.clone().format('dddd')}
          date={date.clone().format('MMMM DD, YYYY')}
          sum={payment.total_amount}
          paymentDesc={payment.current_state}
        />
      );
    });
  };

  onPaymentSelect = memoizeWith(
    id => id,
    curry((id, _ev) => {
      this.props.history.push('/payments/payment/' + id, { from: 'payments' });
    })
  );

  loadMore = page => {
    if (!this.state.totalNumOfPages) return;
    if (page >= this.state.totalNumOfPages) {
      this.setState(prevState => {
        return {
          hasMore: false,
          payments: [
            ...prevState.payments,
            ...this.props.payments.slice(
              this.state.currentIndex,
              this.props.payments.length
            ),
          ],
          currentIndex: this.props.payments.length - 1,
        };
      });
    } else {
      this.setState(prevState => {
        return {
          payments: [
            ...prevState.payments,
            ...this.props.payments.slice(
              prevState.currentIndex,
              prevState.currentIndex + this.state.jumpBy
            ),
          ],
          currentIndex: prevState.payments.length + this.state.jumpBy,
        };
      });
    }
  };

  onYearSelect = e => {
    const selectedYear = this.props.totalPerYear.find(year => {
      return Object.keys(year)[0] === e.target.value;
    });
    this.setState({
      selectedYear,
    });
  };

  goToPromo = params => {
    this.props.history.push('/profile/referrals/angel');
  };

  render() {
    return (
      <React.Fragment>
        <DesktopError
          errors={this.props.errors}
          onRetry={this.props.onGetAngelPayments}
        />
        <ProgressivePayments
          isLoading={this.props.isLoading && !this.props.payments.length}
        />
        <ProgressivePayments
          isLoading={this.props.isLoading && !this.props.payments.length}
        />
        {this.props.credit ? (
          <Promo goToPromo={this.goToPromo} credit={this.props.credit} />
        ) : null}

        {this.props.totalPerYear ? (
          <Segment basic vertical>
            <Sorting
              selectedYear={this.state.selectedYear}
              onYearSelect={this.onYearSelect}
              paymentsPerYear={this.props.totalPerYear}
            />
          </Segment>
        ) : null}

        {this.props.payments.length ? (
          <PaymentsList>
            <InfiniteScroll
              pageStart={1}
              useWindow={false}
              loadMore={this.loadMore}
              hasMore={this.state.hasMore}
              loader={<ScrollerLoader key={9999} />}
            >
              {this.renderPaymentsList()}
            </InfiniteScroll>
          </PaymentsList>
        ) : null}
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      payments: getAngelPayments(state),
      totalPerYear: getAngelPaymentsTotal(state),
      errors: getErrors(state),
      isLoading: getLoadingStatus(state),
      credit: getAngelCredit(state),
    }),
    {
      onGetAngelPayments,
    }
  )(AngelPayments)
);
