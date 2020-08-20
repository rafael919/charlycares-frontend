import { FamilyTabBar } from 'Components/NavigationTabs';
import { FormattedMessage } from 'react-intl';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import React, { Component } from 'react';
import CustomLink from 'Components/CustomLink';

import VerificationFailed from './components/VerificationFailed';
import VerificationSuccess from './components/VerificationSuccess';

class PaymentMethodVerification extends Component {

  componentDidMount() {
    try {
      window.location = "charlyapp:/" + this.props.location.pathname + this.props.location.search; 
    } catch(error) {
      console.log(error); 
    }
  }  

  render() {

    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="navigation.tabs.verficationPayment" />}
        navRightComponent={() => (
          <CustomLink to="/booking" primary>
            <FormattedMessage id="navigation.tabs.save" />
          </CustomLink>
        )}
      >

        {this.props.isLoading && <Loader />}
        
        {(this.props.match.params.status === 'failed' ? <VerificationFailed history={this.props.history} /> : <VerificationSuccess hadPandingBooking={this.props.location.search.includes('had_pending_booking=true')} history={this.props.history} />)}

        <FamilyTabBar />
      </Layout>
    );
  }
}

export default PaymentMethodVerification;
