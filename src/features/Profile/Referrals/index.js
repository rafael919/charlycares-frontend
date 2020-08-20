import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import React, { Component } from 'react';
import WithRole from 'Components/WithRole';
import { FamilyTabBar, AngelTabBar } from 'Components/NavigationTabs';

import { capitalizeFirstLetter } from 'Utils';
import API from './api';
import ReferralOverview from './components/ReferralOverview';
import LastAction from './components/LastAction';
import PromoSection from './components/PromoSection';
import { getReferralSettings } from './selectors';

class Referrals extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    API.getReferrals(this.props.match.params.role).then(response => {
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
      <Layout
        navBorder
        longTitle
        onNavClose={this.props.history.goBack}
        navTitle={
          <FormattedMessage
            id="profile.referral.header"
            values={{
              role: capitalizeFirstLetter(this.getRole()),
            }}
          />
        }
      >
        {this.state.isLoading ? <Loader /> : null}
        <Error errors={this.state.error} onErrorConfirm={this.onErrorConfirm} />
        {this.state.referrals && this.props.referralSettings && (
          <CustomRow noPadding>
            <CustomColumn noPadding>
              <Divider noTopBorder />
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
            </CustomColumn>
          </CustomRow>
        )}
        <WithRole>
          {role => (role === 'family' ? <FamilyTabBar /> : <AngelTabBar />)}
        </WithRole>
      </Layout>
    );
  }
}

export default connect(state => ({
  referralSettings: getReferralSettings(state),
}))(Referrals);
