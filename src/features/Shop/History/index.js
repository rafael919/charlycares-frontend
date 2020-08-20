import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import { ProgressiveConversations } from 'Components/Progressive';

import Points from '../components/PointBar';

import { getLoadingStatus, getErrors } from '../../../ui/selectors';
import {
  getTransactions,
  getUserId,
  getAvailablePoints,
  getPurchaseCount,
} from '../selectors';

import { onGetTransactions } from '../actions';

import TransactionHistoryList from '../components/TransactionHistoryList';

class History extends Component {
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

  render() {
    const { isLoading, history } = this.props;
    const { transactions, availablePoints } = this.state;
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="shop.menu.history" />}
        onNavBack={history.goBack}
      >
        <ContentWrapper>
          <CustomRow noPadding>
            <CustomColumn noPadding>
              {isLoading ? (
                <CustomColumn>
                  <ProgressiveConversations isLoading={true} />
                </CustomColumn>
              ) : (
                <CustomColumn>
                  <Points value={`${availablePoints}`} />
                  <Divider />
                  <TransactionHistoryList transactionHistories={transactions} />
                </CustomColumn>
              )}

              {/* {transactions.length === 0 && (
                <EmptyList id="shop.noTransactions" />
              )} */}
            </CustomColumn>
          </CustomRow>
        </ContentWrapper>
      </Layout>
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
