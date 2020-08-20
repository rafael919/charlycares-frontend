import { AngelTabBar } from 'Components/NavigationTabs';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { ProgressivePayments } from 'Components/Progressive';
import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import memoizeWith from 'ramda/es/memoizeWith';
import curry from 'ramda/es/curry';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import EmptyCell from 'Components/EmptyCell';
import Error from 'Components/Error';
import InfiniteScroll from 'react-infinite-scroller';
import ScrollerLoader from 'Components/ScrollerLoader';
import Layout from 'Components/Layout';
import moment from 'moment';
import React, { PureComponent } from 'react';

import {
  getAngelPayments,
  getAngelPaymentsTotal,
  getAngelCredit,
} from './selectors';
import { getLoadingStatus, getErrors } from '../../../ui/selectors';
import { onGetAngelPayments } from './actions';
import PaymentItem from '../components/PaymentItem';
import PaymentsList from './components/PaymentsList';
import Sorting from './components/Sorting';
import Promo from './components/Promo';
import placeholder from 'Assets/images/familyProfilePlaceholder.png';

class AngelPayments extends PureComponent {
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
          onSelect={this.onPaymentSelect(payment.id)}
          key={payment.id}
          img={payment.family[0].image ? payment.family[0].image : placeholder}
          divider
          angel
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
      <Layout
        navBorder
        navTitle={<FormattedMessage id="payments.angel.home.navTitle" />}
        onNavBack={this.props.history.goBack}
      >
        <Error
          errors={this.props.errors}
          onRetry={this.props.onGetAngelPayments}
        />
        <ContentWrapper>
          <CustomRow noPadding>
            <CustomColumn noPadding>
              {this.props.credit ? (
                <Promo goToPromo={this.goToPromo} credit={this.props.credit} />
              ) : null}
              <Divider center>
                {this.props.totalPerYear && (
                  <Sorting
                    selectedYear={this.state.selectedYear}
                    onYearSelect={this.onYearSelect}
                    paymentsPerYear={this.props.totalPerYear}
                  />
                )}
              </Divider>
              <ProgressivePayments isLoading={this.props.isLoading} />
              <PaymentsList>
                {this.props.payments && this.props.payments.length ? (
                  <InfiniteScroll
                    pageStart={1}
                    loadMore={this.loadMore}
                    hasMore={this.state.hasMore}
                    loader={<ScrollerLoader key={9999} />}
                  >
                    {this.renderPaymentsList()}
                  </InfiniteScroll>
                ) : null}
              </PaymentsList>
            </CustomColumn>
          </CustomRow>
          <EmptyCell padding="0 0 7rem" />
        </ContentWrapper>
        <AngelTabBar />
      </Layout>
    );
  }
}

export default connect(
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
)(AngelPayments);
