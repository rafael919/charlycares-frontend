import Confirmation from 'Components/Confirmation';
import CustomRow from 'Components/CustomRow';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import ConfrimationSection from './components/ConfirmationSection';
import SubscriptionDetails from './components/SubscriptionDetails';

export default class PaymentsSubscription extends Component {
  render() {
    return (
      <Layout
        navBorder
        navTitle="Payment"
        navSubTitle="detail: BKF-57523"
        onNavBack={this.props.history.goBack}
      >
        <CustomRow noPadding>
          <SubscriptionDetails />
        </CustomRow>
        <Confirmation>
          <ConfrimationSection sum="6," />
        </Confirmation>
      </Layout>
    );
  }
}
