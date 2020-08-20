import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Loader from 'Components/Loader';
import React, { Component } from 'react';

import VerificationFailed from '../components/VerificationFailed';
import VerificationSuccess from '../components/VerificationSuccess';

import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';

class PaymentMethodVerification extends Component {

  render() {

    return (

        <DesktopWelcomeLayout withLogo>

            <CustomRow padding="0 0 0 14.125rem">
                <CustomColumn width={12}>

                    {this.props.isLoading && <Loader />}
            
                    {(this.props.match.params.status === 'failed' ? <VerificationFailed desktop={true} history={this.props.history} /> : <VerificationSuccess desktop={true} hadPandingBooking={this.props.location.search.includes('had_pending_booking=true')} history={this.props.history} />)}

                </CustomColumn>
            </CustomRow>
        </DesktopWelcomeLayout>
      
    );
  }
}

export default PaymentMethodVerification;
