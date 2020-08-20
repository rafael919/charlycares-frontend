import Layout from 'Components/Layout';
import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import injectIntl from 'Utils/injectIntl';
import BasicButton from 'Components/Buttons/Basic';

import Slide from './components/Slide'
import gif1_nl from 'Assets/gifs/slide1_nl.gif';
import gif2_nl from 'Assets/gifs/slide2_nl.gif';
import gif3_nl from 'Assets/gifs/slide3_nl.gif';
import gif4_nl from 'Assets/gifs/slide4_nl.gif';

import gif1_en from 'Assets/gifs/slide1_en.gif';
import gif2_en from 'Assets/gifs/slide2_en.gif';
import gif3_en from 'Assets/gifs/slide3_en.gif';
import gif4_en from 'Assets/gifs/slide4_en.gif';

import { getLocale } from 'Utils';

const Container = styled.div`
  width: 100%;
  heigth: 100%;
  overflow: hidden;
`

const ButtonContainer = styled.div`
    width: 100%;
    text-align: center;
`

class Onboarding extends Component {
  state = {
    slideNumber: '1/4',
    selectedSlide: 0,
    gif1: {
      en: gif1_en,
      nl: gif1_nl
    },
    gif2: {
      en: gif2_en,
      nl: gif2_nl
    },
    gif3: {
      en: gif3_en,
      nl: gif3_nl
    },
    gif4: {
      en: gif4_en,
      nl: gif4_nl
    }
  };

  onSwipe = (currentSlide) => {
    let slideNumber = currentSlide + 1;
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {  
      window.analytics.track('FSignUpInfograpic' + slideNumber.toString(), {});
    }
    this.setState({
      slideNumber: slideNumber.toString() + '/4',
      selectedSlide: currentSlide
    });
  };

  goToBooking = () => {
    this.props.history.push('/booking/babysitting-type')
  };

  render() {
    const intl = this.props.intl;
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="onboarding.navTitle" />}
        //navRightComponent={() => {return (this.state.slideNumber)}}
      >
        <Container>
         <Carousel
          showThumbs={false}
          showArrows={false}
          showStatus={false}
          onChange={this.onSwipe}
          selectedItem={this.state.selectedSlide}
          className={'carousel-wrapper'}
          showIndicators={this.state.selectedSlide < 3}
         >
          <Slide 
            image={this.state.gif1[getLocale()]}
            title={intl.formatMessage({ id: "onboarding.slide1.title" })}
            description={intl.formatMessage({ id: "onboarding.slide1.description" })}
          />
          <Slide 
            image={this.state.gif2[getLocale()]}
            title={intl.formatMessage({ id: "onboarding.slide2.title" })}
            description={intl.formatMessage({ id: "onboarding.slide2.description" })}
          />
          <Slide 
            image={this.state.gif3[getLocale()]}
            title={intl.formatMessage({ id: "onboarding.slide3.title" })}
            description={intl.formatMessage({ id: "onboarding.slide3.description" })}
          />
          <Slide 
            image={this.state.gif4[getLocale()]}
            title={intl.formatMessage({ id: "onboarding.slide4.title" })}
            description={intl.formatMessage({ id: "onboarding.slide4.description" })}
          />
          </Carousel>
        </Container>
        {this.state.selectedSlide === 3 ? 
        <ButtonContainer>
          <BasicButton fluid primary onClick={this.goToBooking}>
            <FormattedMessage id="onboarding.finish" />
          </BasicButton>
        </ButtonContainer>
          : null}
      </Layout>
    );
  }
};

export default injectIntl(Onboarding);
