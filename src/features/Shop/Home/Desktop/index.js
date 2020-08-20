import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import EmptyList from 'Components/EmptyList';
import { ProgressiveFacebook, TimerLoader } from 'Components/Progressive';

import Points from '../../components/PointBar';
import Menus from '../../components/Menus';
import GiftList from '../../components/GiftList';
import ComingSoon from '../../components/ComingSoon';

import { getLoadingStatus, getErrors } from '../../../../ui/selectors';
import {
  getGifts,
  getAvailablePoints,
  getUserId,
  getPurchaseCount,
  getBuyState,
} from '../../selectors';

import { onGetGifts, onBuyGift, onGetTransactions } from '../../actions';

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
        () => {
          this.props.onGetGifts();
        }
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
    const { isLoading, location, history } = this.props;

    return (
      <Fragment>
        {location.pathname === '/shop' && isLoading ? (
          <Segment basic vertical>
            <TimerLoader isLoading={true} />
            <ProgressiveFacebook isLoading={true} />
          </Segment>
        ) : (
          <Fragment>
            <Points value={`${availablePoints}`} />
            <Menus
              purchaseCount={`${purchaseCount}`}
              history={history}
              divider
            />
            {gifts.length ? <GiftList
              showType="all"
              availablePoints={`${availablePoints}`}
              gifts={gifts}
              history={history}
              onPressBtn={this.onPressBtn}
            /> : <ComingSoon />}
          </Fragment>
        )}
        {!isLoading && gifts.length === 0 && <EmptyList id="shop.noGifts" />}
      </Fragment>
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
