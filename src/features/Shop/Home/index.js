import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import React, { Component } from 'react';
import styled from 'styled-components';
import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import EmptyList from 'Components/EmptyList';
import { ProgressiveConversations } from 'Components/Progressive';
import Explanation from 'Components/Explanation/Custom/Shop';

import Points from '../components/PointBar';
import Menus from '../components/Menus';
import GiftList from '../components/GiftList';
import ComingSoon from '../components/ComingSoon';

import { getLoadingStatus, getErrors } from '../../../ui/selectors';
import {
  getGifts,
  getAvailablePoints,
  getUserId,
  getPurchaseCount,
  getBuyState,
} from '../selectors';

import { onGetGifts, onBuyGift, onGetTransactions } from '../actions';

const WelcomeContainer = styled.div`
  width: 100%;
  padding: 0 1rem;
`;

class ShopHome extends Component {
  state = {
    gifts: [],
    availablePoints: 0,
    purchaseCount: 0,
  };

  componentDidMount() {
    this.props.onGetGifts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.buySuccess) {
      this.setState(
        {
          availablePoints: 0,
          purchaseCount: 0,
        },
        () => this.props.onGetGifts()
      );
    }
    if (nextProps.gifts && nextProps.gifts.length > 0)
      this.setState({ gifts: nextProps.gifts });
    if (nextProps.availablePoints)
      this.setState({
        availablePoints: nextProps.availablePoints,
      });
    if (nextProps.purchaseCount)
      this.setState({
        purchaseCount: nextProps.purchaseCount,
      });
  }

  onPressBtn = gift => {
    let gifts = this.state.gifts;
    let data = {
      gift_id: gift.id,
    };
    for (var i = 0; i < gifts.length; i++) {
      if (gifts[i].id === gift.id) {
        gifts[i].isLoading = true;
        break;
      }
    }
    this.props.onBuyGift(data);
  };

  render() {
    const { availablePoints, purchaseCount, gifts } = this.state;
    const { location, history } = this.props;
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="shop.angel.home.navTitle" />}
        onNavBack={history.goBack}
      >
        <ContentWrapper>
          <CustomRow noPadding>
            <CustomColumn noPadding>
              {location.pathname === '/shop' && this.props.isLoading ? (
                <CustomColumn>
                  <ProgressiveConversations isLoading={true} />
                </CustomColumn>
              ) : (
                <CustomColumn>
                  <Points value={`${availablePoints}`} />
                  <Divider />
                  <WelcomeContainer>
                    <Explanation disable />
                  </WelcomeContainer>
                  <Menus
                    purchaseCount={`${purchaseCount}`}
                    history={history}
                    togglePhoneModal={this.togglePhoneModal}
                  />
                  {gifts.length ? <GiftList
                    showType="all"
                    availablePoints={`${availablePoints}`}
                    gifts={gifts}
                    history={history}
                    onPressBtn={this.onPressBtn}
                  /> : <ComingSoon />}
                </CustomColumn>
              )}
              {gifts.length === 0 && <EmptyList id="shop.noGifts" />}
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
  buySuccess: getBuyState(state),
});

const mapDispatchToProps = dispatch => ({
  onGetGifts: () => dispatch(onGetGifts()),
  onGetTransactions: () => dispatch(onGetTransactions()),
  onBuyGift: data => dispatch(onBuyGift(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopHome);
