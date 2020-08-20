import { FormattedMessage } from 'react-intl';
import { Grid, Container } from 'semantic-ui-react';
import Background from 'Components/Background';
import BasicButton from 'Components/Buttons/Basic';
import FullHeight from 'Components/FullHeight';
import React, { Component } from 'react';
import styled from 'styled-components';

import backgroundImg from 'Assets/images/website-frontpage.jpg';

import PromoButton from '../components/PromoButton';
import PromotionalCode from '../components/PromotionalCode';
import USP from '../components/USP';
import API from '../../api';
import USPs from '../components/USPs';

const ButtonContainer = styled.div`
  margin: auto;
  margin-bottom: 2rem;
  margin-top: 0.875rem;
  width: fit-content;
`

const SectionContainer = styled.div`
  width: fit-content;
  text-align: center;
  margin-left: 10rem;
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
      <Container as={FullHeight} fluid>
        <Grid padded as={FullHeight}>
          <Grid.Column
            only="computer"
            stretched
            computer={5}
            largeScreen={6}
            widescreen={7}
          >
            <Background src={backgroundImg} />
          </Grid.Column>       
          <Grid.Column
            verticalAlign="middle"
            computer={8}
            tablet={8}
            largeScreen={8}
            widescreen={8}
          >
          <SectionContainer>
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

            <USPs />

          </SectionContainer>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
