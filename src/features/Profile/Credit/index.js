import { FamilyTabBar, AngelTabBar } from 'Components/NavigationTabs';

import {
  getReferralSettings,
  getCredit,
  getIsCouponValid,
  getMessage,
  getType,
} from './selectors';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { onAddPromoCode } from './actions';
import { getErrors, getLoadingStatus } from '../../../ui/selectors';
import { onErrorConfirm } from '../../../ui/actions';
import CustomColumn from 'Components/CustomColumn';
import WithRole from 'Components/WithRole';
import CustomRow from 'Components/CustomRow';
import Error from 'Components/Error';
import Loader from 'Components/Loader';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import BabysittingCredit from './components/BabysittingCredit';
import PromotionalCode from './components/PromotionalCode';

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
    const { message, credit, type } = this.props;
    return (
      <Layout
        onNavBack={this.props.history.goBack}
        navBorder
        navTitle={<FormattedMessage id="profile.family.credit.navTitle" />}
      >
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        {this.props.isLoading && <Loader />}
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <BabysittingCredit credit={credit} />
            <Divider />
            <PromotionalCode
              onPromoCodeChange={this.onPromoCodeChange}
              promoCode={this.state.promoCode}
              isCodeValid={this.props.isCodeValid}
              onApply={this.onCouponApply}
              message={message}
              type={type}
            />
            <Divider />
            {/* <PromoContainer
              title={referralSettings.title}
              content={referralSettings.content}
              mailSubject={referralSettings.mail_subject}
              referralMessage={referralSettings.message}
              link={referralSettings.link} 
            />*/}
          </CustomColumn>
        </CustomRow>
        <WithRole>
          {role => (role === 'family' ? <FamilyTabBar /> : <AngelTabBar />)}
        </WithRole>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  credit: getCredit(state),
  referralSettings: getReferralSettings(state),
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
