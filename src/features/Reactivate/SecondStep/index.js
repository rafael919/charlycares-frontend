import { FormattedMessage } from 'react-intl';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Layout from 'Components/Layout';
import Divider from 'Components/Divider';
import React, { Component } from 'react';
import styled from 'styled-components';

import PromoButton from './components/PromoButton';
import PromotionalCode from './components/PromotionalCode';
import USP from './components/USP';
import API from '../api';
import USPs from './components/USPs';

const Container = styled.div`
  width: 100%;
  text-align: center;
`

const ButtonContainer = styled.div`
  margin: auto;
  margin-bottom: 2rem;
  margin-top: 0.875rem;
  width: fit-content;
`

export default class Reactivate extends Component {

  state = {
    promoCode: '',
    showPromoInput: false
  };

  onPromoCodeChange = e => {
    this.setState({
      promoCode: e.target.value,
    });
  };

  onCouponApply = () => {
    API.addPromoCode(this.state.promoCode).then((resp) => {
      this.setState({
        isCodeValid: true,
        message: resp.data.data.description,
        type: resp.data.message,
        coupon: ''
      });
    });
  };

  togglePromoCode = () => {
    this.setState({
      showPromoInput: !this.state.showPromoInput
    })
  }

  onActivateMembership = () => {
    API.activateMembership().then((resp) => {
      this.props.history.push('/booking');
    });
  }

  render() {
    return (
      <Layout
        onNavBack={this.props.history.goBack}
        navTitle={<FormattedMessage id="reactivate.step2.header" />}
        navBorder
      >
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Container>
            <Divider />
              <USP />

              <ButtonContainer>
                <BasicButton primary onClick={this.onActivateMembership} fluid>
                  <FormattedMessage id="reactivate.step2.connect" />
                </BasicButton>
              </ButtonContainer>

              {!this.state.showPromoInput ? 
                <PromoButton onClick={this.togglePromoCode} >
                  Giftcode >
                </PromoButton> 
                : <PromotionalCode 
                  isCodeValid={this.state.isCodeValid}
                  onPromoCodeChange={this.onPromoCodeChange}
                  promoCode={this.state.promoCode}
                  onApply={this.onCouponApply}
                  message={this.state.message}
                  type={this.state.type}
                />}

              <Divider />
              <USPs />
            </Container>
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}
