import { connect } from 'react-redux';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Loader from 'Components/Loader';
import React, { Component } from 'react';
import { getUserProfile } from '../selectors';

import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';

import Desc from '../components/Desc';
import PaymentMethod from '../components/PaymentMethod';

class ExpiredCard extends Component {

  render() {
    return (
        <DesktopWelcomeLayout withLogo>
            <CustomRow padding="0 0 0 14.125rem">
                <CustomColumn width={12}>

                  {this.props.isLoading && <Loader />}
                  <Desc />
                  <PaymentMethod 
                    link={this.props.paymentLink} 
                    accountNumber={this.props.profile.account_number} 
                  />
                    

                </CustomColumn>
            </CustomRow>
        </DesktopWelcomeLayout>
      
    );
  }
}

const mapStateToProps = state => ({
  profile: getUserProfile(state),
});

export default connect(
  mapStateToProps,
)(ExpiredCard);
