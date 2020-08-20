import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import React, { Component } from 'react';
import { getUserProfile } from './selectors';

import Desc from './components/Desc';
import PaymentMethod from './components/PaymentMethod';

class ExpiredCard extends Component {

  render() {
    return (
      <Layout
        navTitle={<FormattedMessage id="payments.family.expiredCard.header" />}
        navBorder
      >
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <Desc />
            <Divider />
            <PaymentMethod 
              link={this.props.paymentLink} 
              accountNumber={this.props.profile.account_number} 
            />
              {this.props.isLoading && <Loader />}
            
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  profile: getUserProfile(state),
});

export default connect(
  mapStateToProps,
)(ExpiredCard);
