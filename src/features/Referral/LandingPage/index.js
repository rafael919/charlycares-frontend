import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import React, { PureComponent } from 'react';

import { getErrors } from '../../../ui/selectors';
import { Image } from 'semantic-ui-react';

import styled from 'styled-components';
import BasicButton from 'Components/Buttons/Basic';
import CustomRow from 'Components/CustomRow'; 
import CustomColumn from 'Components/CustomColumn'; 

import { getLandingPageData } from './selectors';
import { onGetLandingPageData } from './action';
import { withRouter } from 'react-router-dom';
import GiftItem from '../components/GiftItem';
import Layout from 'Components/Layout';
import presentIcon from 'Assets/icons/icn-present.svg';
import logo2 from 'Assets/images/logo2.png';
import Divider from 'Components/Divider';

import Reviews from '../components/Reviews';

const CustomImage = styled(Image)`
  &&& {
    margin-right: 0.9375rem;
  }
`;

const Logo = styled.img`
  width: 6rem;
`
const LogoContainer = styled.div`
  width: 100%;
  text-align: center;
`

const TitleText = styled.div`
  padding-top: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
`

const GiftContainer = styled.div`
    margin-left: auto; 
    margin-right: auto;
    display: inline-flex;
    margin-top: 0rem;
    font-family: ${props => props.theme.primaryFont};
    font-size: 1.5rem;
    padding-left: 0 !important;
    height: 4rem;
    margin-bottom: 1rem;
`

const Description = styled.div`
  padding: 1rem;
  text-align: left;
  margin-bottom: 1rem;
`

const ButtonContainer = styled.div`
  width: 85%;
  margin: auto;
  margin-bottom: 1rem;
`
class ReferralLanding extends PureComponent {
  referenceNo = ""
    state = {
      data : null,
      isLoading : false,
      dataLoaded : false,
      error : null
    };

    componentDidMount () {
        this.props.getInviteData(this.props.match.params.reference, this.props.match.params.target);
    }

    componentDidUpdate(prevProps, prevState) {
        if (
          this.props.data !== prevProps.data
        ) {
          this.setState({
            data : this.props.data
          });
        }
        if(this.props.errors !== prevProps.errors){
          this.setState({error : this.props.errors})
        }
    }

    onSignup = () => {
        if ( process.env.NODE_ENV === 'production' || process.env.REACT_APP_STAGE === 'testing') {
            window.analytics.track('UReferralSignup');
        }
    
        var referral = {
            referrer_id: this.state.data.referrer_id,
            campaign_id: this.state.data.id
        }

        if(this.state.data.target_referral === 'angel') {
            this.props.history.push({
                pathname: '/signup/angel',
                state: { referral }
            })
        } else {
            this.props.history.push({
                pathname: '/signup/family',
                state: { referral }
            })
        }
    };


  render() {
    return (
      this.state.data && 
      <Layout>
        <CustomRow noPadding textAlign={'center'}>
          <CustomColumn noPadding>
          <LogoContainer>
            <Logo src={logo2} />
          </LogoContainer>

            <GiftContainer> 
              <CustomImage src={presentIcon}/>
              <TitleText>
                <FormattedMessage id="referral.landing.heading" />
              </TitleText>
            </GiftContainer>

            <GiftItem 
                key={this.state.data != null ? this.state.data.id : "1"}
                img={this.state.data != null ? this.state.data.referrer_image : null}
                name={this.state.data != null ? this.state.data.referrer : "loading .. "}
                amount = {this.state.data != null ? ("€"+Math.round(this.state.data.amount_sender)+",-") : "--"}
                text={createMarkup(this.state.data.landing_subtitle)}
            />

            <Description color = "rgb(57,56,62)"  fontSize="0.9rem" >
                <div dangerouslySetInnerHTML={createMarkup(this.state.data.landing_message)}></div>
            </Description>
          <ButtonContainer>
            <BasicButton
                disabled={false}
                primary
                fluid
                onClick = {this.onSignup}
                >
                {this.state.data.button_text}
            </BasicButton>
          </ButtonContainer>
          <Divider>
            <FormattedMessage id="referral.landing.otherUsers" />
          </Divider>
          <Reviews ratings={this.state.data.ratings.slice(0,3)} />
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}


function createMarkup(message) {
  return {__html: message};
}

const mapStateToProps = state => ({
    data: getLandingPageData(state),
    errors: getErrors(state),
  });
  
  const mapDispatchToProps = dispatch => ({
    getInviteData: (referenceNo, target) => dispatch(onGetLandingPageData(referenceNo, target)),
  });
  export default withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(ReferralLanding)
  );
