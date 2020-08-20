import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import BasicButton from 'Components/Buttons/Basic';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import React, { Component } from 'react';
import presentIcon from 'Assets/icons/icn-present.svg';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';
import GiftItem from '../../components/GiftItem';
import { getLandingPageData } from '../selectors';
import { getErrors } from '../../../../ui/selectors';
import { onGetLandingPageData } from '../action';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

const CustomImage = styled(Image)`
  &&& {
    margin-right: 0.9375rem;
  }
`;


const Description = styled.div`
  padding: 1rem;
  text-align: left;
  margin-bottom: 1rem;
`


class ReferralLanding extends Component {
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

    renderGiftItem = () => {
        return(
            <GiftItem 
                key={this.state.data != null ? this.state.data.id : "1"}
                img={this.state.data != null ? this.state.data.referrer_image : null}
                name={this.state.data != null ? this.state.data.referrer : "loading .. "}
                amount = {this.state.data != null ? ("€"+Math.round(this.state.data.amount_sender)+",-") : "--"}
                text={createMarkup(this.state.data.landing_subtitle)}
            />
        )
        
    }

    render() {
        return this.state && this.state.data && (
        <div style = {{backgroundColor : '#fff'}}>
        <DesktopWelcomeLayout withLogo>
            <Grid.Row columns={2} textAlign = 'center'>
                {/* <Grid.Column computer={1} mobile={0} tablet={0}> */}
                <div style = {{width : 40 , height : 40}}>
                    <CustomImage src={presentIcon}/>
                </div>
                {/* </Grid.Column> */}
                {/* <Grid.Column computer={3} mobile={16} tablet={16}> */}
                    <div style = {{color : 'rgb(57,56,62)',fontSize : 22,marginTop : 11,marginLeft : 10,fontWeight : '500'}}>
                        <FormattedMessage id="referral.landing.heading" />
                    </div>
                {/* </Grid.Column> */}
            </Grid.Row>
            <Grid.Row textAlign = "middle">
                <Grid.Column computer={7} mobile={16} tablet={16}>
                    <this.renderGiftItem />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign="middle" style={{whiteSpace: 'pre-line'}}>
                <Grid.Column computer={7} mobile={16} tablet={16}>
                    <Description color = "rgb(57,56,62)"  fontSize="0.9rem" >
                        <div dangerouslySetInnerHTML={createMarkup(this.state.data.landing_message)}></div>
                    </Description>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns = {1}>
                <Grid.Column textAlign = "left" computer={7} mobile={16} tablet={14}>
                <BasicButton
                    disabled={false}
                    primary
                    fluid
                    onClick = {this.onSignup}
                    >
                    <FormattedMessage id="referral.landing.btn.text" />
                </BasicButton>
                </Grid.Column>
            </Grid.Row>
            
        </DesktopWelcomeLayout>
        </div>
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