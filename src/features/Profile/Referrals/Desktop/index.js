import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Navigation from 'Components/Navigation';
import DesktopError from 'Components/DesktopError';
import Loader from 'Components/Loader';
import React, { Component } from 'react';

import Divider from 'Components/Divider';
import API from '../api';
import ReferralOverview from '../components/ReferralOverview';
import LastAction from '../components/LastAction';
import PromoSection from '../components/PromoSection';
import { getReferralSettings } from '../selectors';
import { capitalizeFirstLetter } from 'Utils';

class Referrals extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    API.getReferrals().then(response => {
      this.setState({
        referrals:
          response.data.data[this.props.match.params.role + '_referral'],
        isLoading: false,
      });
    });
  }

  getRole = () => {
    if (this.props.match.params.role === 'family') {
      return 'families';
    }

    return 'Angels';
  };

  render() {
    return (
      <React.Fragment>
        <Navigation
          title={
            <FormattedMessage
              id="profile.referral.header"
              values={{
                role: capitalizeFirstLetter(this.getRole()),
              }}
            />
          }
          onBack={this.props.history.goBack}
        />
        {this.state.isLoading ? <Loader /> : null}
        <DesktopError
          errors={this.state.error}
          onErrorConfirm={this.onErrorConfirm}
        />
        {this.state.referrals && this.props.referralSettings && (
          <div>
            {this.state.referrals.length > 0 && (
              <LastAction referral={this.state.referrals[0]} />
            )}
            <Divider />
            <PromoSection
              referralSettings={
                this.props.referralSettings[
                  'active_' + this.props.match.params.role + '_campaign'
                ]
              }
              role={this.getRole()}
            />
            <Divider />
            <ReferralOverview
              role={this.getRole()}
              referrals={this.state.referrals}
              amountSender={
                this.props.referralSettings[
                  'active_' + this.props.match.params.role + '_campaign'
                ].amount_sender
              }
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  referralSettings: getReferralSettings(state),
}))(Referrals);
