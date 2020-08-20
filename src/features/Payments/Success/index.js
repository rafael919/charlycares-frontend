import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import Image from './components/Image';
import ImageContainer from './components/ImageContainer';
import Desc from './components/Desc';
import PromoSection from '../components/PromoSection';
import React, { Component } from 'react';
import { getReferralSettings } from './selectors';

import successImg from 'Assets/images/success.png';

class Success extends Component {
  render() {
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="booking.family.success.title" />}
        navRightComponent={() => (
          <CustomLink fontSize="1.2rem" to="/booking">
            <FormattedMessage id="booking.family.success.doneBtn" />
          </CustomLink>
        )}
      >
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <ImageContainer>
              <Image src={successImg} />
            </ImageContainer>
            <Desc />
            <Divider />
            <PromoSection referrals={this.props.referrals} />
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

export default connect(state => ({
  referrals: getReferralSettings(state),
}))(Success);
