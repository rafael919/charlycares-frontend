import { connect } from 'react-redux';

import Image from '../components/Image';
import ImageContainer from '../components/ImageContainer';
import Desc from '../components/Desc';
import PromoSection from '../../components/PromoSection';
import React, { Component } from 'react';
import { getReferralSettings } from '../selectors';

import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';

import successImg from 'Assets/images/success.png';

class Success extends Component {
  render() {
    return (
      <React.Fragment> 
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <ImageContainer>
              <Image src={successImg} />
            </ImageContainer>
            <Desc />
            <Divider />
            <PromoSection referrals={this.props.referrals} />
          </CustomColumn>
        </CustomRow>
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  referrals: getReferralSettings(state),
}))(Success);
