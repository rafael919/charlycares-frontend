import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import Navigation from 'Components/Navigation';
import EmptyList from 'Components/EmptyList';
import { ProgressiveFacebook, TimerLoader } from 'Components/Progressive';

import { getLoadingStatus, getErrors } from '../../../../ui/selectors';
import {
  getTransactions,
  getUserId,
  getAvailablePoints,
  getPurchaseCount,
} from '../../selectors';

import { onGetTransactions } from '../../actions';

import TransactionHistoryList from '../../components/TransactionHistoryList';

class History extends React.Component {
  state = {
    transactions: [],
    availablePoints: 0,
    purchaseCount: 0,
  };

  componentDidMount() {
    this.props.onGetTransactions();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.transactions && nextProps.transactions.length > 0)
      this.setState({ transactions: nextProps.transactions });

    if (nextProps.availablePoints)
      this.setState({ availablePoints: nextProps.availablePoints });

    if (nextProps.purchaseCount)
      this.setState({ purchaseCount: nextProps.purchaseCount });
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { isLoading, location, history } = this.props;
    const { transactions } = this.state;

    return (
      <Fragment>
        <Navigation
          title={<FormattedMessage id="shop.menu.history" />}
          onBack={history.goBack}
        />
        {isLoading &&
        location.pathname.includes('/shop/history') &&
        !transactions.length ? (
          <Segment basic vertical>
            <TimerLoader isLoading={true} />
            <ProgressiveFacebook isLoading={true} />
          </Segment>
        ) : (
          <Fragment>
            <TransactionHistoryList transactionHistories={transactions} />
          </Fragment>
        )}
        {!isLoading && transactions.length === 0 && (
          <EmptyList id="shop.noTransactions" />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
  userId: getUserId(state),
  transactions: getTransactions(state),
  availablePoints: getAvailablePoints(state),
  purchaseCount: getPurchaseCount(state),
});

const mapDispatchToProps = dispatch => ({
  onGetTransactions: () => dispatch(onGetTransactions()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
