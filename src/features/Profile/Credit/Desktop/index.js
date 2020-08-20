import { connect } from 'react-redux';
import { Divider } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import DesktopError from 'Components/DesktopError';
import Loader from 'Components/Loader';
import Navigation from 'Components/Navigation';
import React, { Component, Fragment } from 'react';

import { getErrors, getLoadingStatus } from '../../../../ui/selectors';

import {
  getCredit,
  getIsCouponValid,
  getMessage,
  getType,
} from '../selectors';
import { onAddPromoCode } from '../actions';
import { onErrorConfirm } from '../../../../ui/actions';
import BabysittingCredit from '../components/BabysittingCredit';
import PromotionalCode from '../components/PromotionalCode';

class Credit extends Component {
  state = {
    promoCode: '',
  };

  onPromoCodeChange = e => {
    this.setState({
      promoCode: e.target.value,
    });
  };

  onCouponApply = () => {
    const data = {
      coupon: this.state.promoCode,
    };

    this.setState(
      {
        promoCode: '',
      },
      () => {
        this.props.onAddPromoCode(data);
      }
    );
  };

  render() {
    const { credit, message, type } = this.props;
    return (
      <Fragment>
        <Navigation
          title={<FormattedMessage id="profile.family.credit.navTitle" />}
          onBack={this.props.history.goBack}
        />
        {this.props.isLoading ? <Loader /> : null}
        <DesktopError
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        <BabysittingCredit credit={credit} />
        <PromotionalCode
          onPromoCodeChange={this.onPromoCodeChange}
          promoCode={this.state.promoCode}
          isCodeValid={this.props.isCodeValid}
          onApply={this.onCouponApply}
          message={message}
          type={type}
        />
        <Divider />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  credit: getCredit(state),
  isCodeValid: getIsCouponValid(state),
  errors: getErrors(state),
  isLoading: getLoadingStatus(state),
  message: getMessage(state),
  type: getType(state),
});

const mapDispatchToProps = dispatch => ({
  onAddPromoCode: data => dispatch(onAddPromoCode(data)),
  onErrorConfirm: () => dispatch(onErrorConfirm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Credit);
