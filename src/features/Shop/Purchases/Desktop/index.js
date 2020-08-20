import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Segment } from 'semantic-ui-react';
import { ProgressiveFacebook, TimerLoader } from 'Components/Progressive';
import EmptyList from 'Components/EmptyList';
import Navigation from 'Components/Navigation';

import { getLoadingStatus, getErrors } from '../../../../ui/selectors';

import {
  getGifts,
  getAvailablePoints,
  getUserId,
  getPurchaseCount,
} from '../../selectors';

import GiftList from '../../components/GiftList';

class Purchases extends React.Component {
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
    const { isLoading, location, history } = this.props;
    const { gifts, availablePoints } = this.state;

    return (
      <Fragment>
        <Navigation
          title={<FormattedMessage id="shop.menu.purchases" />}
          onBack={history.goBack}
        />
        {isLoading &&
        location.pathname.includes('/shop/purchases') &&
        !gifts.length ? (
          <Segment basic vertical>
            <TimerLoader isLoading={true} />
            <ProgressiveFacebook isLoading={true} />
          </Segment>
        ) : (
          <Fragment>
            <GiftList
              showType="purchased"
              availablePoints={`${availablePoints}`}
              gifts={gifts}
              history={history}
              onPressBtn={this.onPressBtn}
            />
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
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Purchases);
