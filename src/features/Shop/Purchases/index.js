import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import { ProgressiveConversations } from 'Components/Progressive';

import Points from '../components/PointBar';
import GiftList from '../components/GiftList';

import { getLoadingStatus, getErrors } from '../../../ui/selectors';
import {
  getGifts,
  getAvailablePoints,
  getUserId,
  getPurchaseCount,
} from '../selectors';

import { onGetGifts, onGetTransactions } from '../actions';

class Purchases extends Component {
  state = {
    gifts: [],
    availablePoints: 0,
    purchaseCount: 0,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.gifts && nextProps.gifts.length > 0)
      this.setState({ gifts: nextProps.gifts });
    if (nextProps.availablePoints)
      this.setState({ availablePoints: nextProps.availablePoints });
    if (nextProps.purchaseCount)
      this.setState({ purchaseCount: nextProps.purchaseCount });
  }

  onPressBtn = gift => {
    const { history } = this.props;
    history.push('/shop/purchase/' + gift.id, { from: 'shop', gift: gift });
  };

  render() {
    const { availablePoints, gifts } = this.state;
    const { isLoading, history } = this.props;
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="shop.menu.purchases" />}
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

                  <GiftList
                    showType="purchased"
                    availablePoints={`${availablePoints}`}
                    gifts={gifts}
                    history={history}
                    onPressBtn={this.onPressBtn}
                  />
                </CustomColumn>
              )}

              {/* {gifts.length === 0 && <EmptyList id="shop.noGifts" />} */}
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
  gifts: getGifts(state),
  availablePoints: getAvailablePoints(state),
  purchaseCount: getPurchaseCount(state),
});

const mapDispatchToProps = dispatch => ({
  onGetGifts: () => dispatch(onGetGifts()),
  onGetTransactions: () => dispatch(onGetTransactions()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Purchases);
