import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';

import BasicButton from 'Components/Buttons/Basic';

import React, { Component } from 'react';
import presentIcon from 'Assets/icons/icn-present.svg';
import familyImage from 'Assets/images/share-family.jpg';
import angelImage from 'Assets/images/share-angel.png';

import styled from 'styled-components';
import { Image } from 'semantic-ui-react';
import { getInviteData } from './selectors';
import { getErrors } from '../../../ui/selectors';
import { onGetInviteData } from './action';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import Layout from 'Components/Layout'

const CustomImage = styled(Image)`
    align-self: start;
    margin-right: 0.5rem;
`;

const SubHeader = styled.div`
    font-weight: bold;
`

const HeaderImage = styled.img`
    width: calc(100% + 2rem);
    margin-left: -1rem;
    margin-right: -1rem;
`;

const Title = styled.div`
    color: ${props => props.theme.primaryText};
    font-size: 1.125rem;
    font-weight : 300;
`

const SubTitle = styled.div`
    margin-top: 0.275rem;
    line-height: 1rem;
    font-size: 0.875rem;
`

const ShareLink = styled.div`
    background-color: ${props => props.theme.defaultGrey};
    margin-left: 1rem;
    margin-top: 0.5rem;
    border-radius: 1rem;
    width: 100%;
    margin: auto;
    padding: 0.5rem;
    padding-left: 1.5rem;
    flex-direction: row;
    display: inline-flex;
    color: ${props => props.theme.grey};
    justify-content: space-between;
    alignItems: center;
`

const CopyButton = styled.div`
    margin-right: 1rem;
    font-size: 1rem;
    color: ${props => props.theme.secondaryColor};
    cursor: pointer;
    margin-top: -3;
`

const Centered = styled.div`
    margin: 0.5rem;
    text-align: center;
`

const HeaderContainer = styled.div`
    width: 100%;
    display: inline-flex;
    text-align: left;
    margin-top: 1rem;
    margin-bottom: 0.75rem;
`

const Content = styled.div`
    white-space: pre-rap;
    display: 'block';
    font-size: 1rem;
    margin-top: -20;
    margin-bottom: 0.5rem;
    text-align: left;
    font-weight: 300;
    line-height: 1.75rem;
`

const ButtonContainer = styled.div`
    margin-bottom: 2rem;
    margin-top: -1rem;
`
class ReferralSend extends Component {
    userID = ""
    state = {
        shareURL : "",
        data : null,
        isLoading : false,
        dataLoaded : false,
        error : null
    };

    componentDidMount () {
        const userId = this.props.match.params.userId
        this.props.getShareData(userId)
    }

    componentDidUpdate(prevProps, prevState) {
        if (
          this.props.data !== prevProps.data
        ) {
            console.log(this.props.data)
          this.setState({
            data : this.props.data
          });
        }
        if(this.props.errors !== prevProps.errors){
          this.setState({error : this.props.errors})
        }
      }

    onClickCopyLink = () =>{
        if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'testing') {  
            window.analytics.track('UShareReferral', {
                role: this.state.data.role,
                method: 'copy'
            });
        }
        if (document.selection) { 
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById("link"));
            range.select().createTextRange();
            document.execCommand("copy"); 
        } else if (window.getSelection) {
            range = document.getSelection().getRangeAt(0);
            range.selectNode(document.getElementById("link"));
            window.getSelection().addRange(range);
            document.execCommand("copy")
        }
    }

    onClickShareViaWhatsapp = (message) => {
        if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'testing') {  
            window.analytics.track('UShareReferral', {
                role: this.state.data.role,
                method: 'whatsapp'
            });
        }
        window.location.href = "https://api.whatsapp.com/send?text="+message
    }

    getImage = () => {
        if(this.state.data.role === 'family') {
            return familyImage;
        }
        return angelImage;
    }

    render() {
        return (
            this.state.data && <Layout
                navBorder
                navTitle={<FormattedMessage id="referral.send.header.text"/>}
                longTitle
            >
            <Grid centered>
            <HeaderImage src={this.getImage()} />
            <HeaderContainer>
                <CustomImage src={presentIcon}/>
                <Grid.Column computer={6} mobile={12} tablet={16}>
                    <Title>
                        <div dangerouslySetInnerHTML={createMarkup(this.state.data.title)}></div>
                        <SubTitle>
                           <div dangerouslySetInnerHTML={createMarkup(this.state.data.subtitle)}></div>
                        </SubTitle>
                    </Title>
                </Grid.Column>
            </HeaderContainer>

                    
            <Grid.Row textAlign = "middle">
            <Grid.Column>
                <SubHeader>
                    <div dangerouslySetInnerHTML={createMarkup(this.state.data.subheader)}></div>
                </SubHeader>
            </Grid.Column>
            </Grid.Row>
            <Content>
                <div dangerouslySetInnerHTML={createMarkup(this.state.data.content)}></div>
            </Content>
            <Grid.Row>
                <Grid.Column computer={8} mobile={24} tablet={16}>
                <ShareLink>
                    {this.state.data.link}
                    <CopyButton onClick = {this.onClickCopyLink}>copy</CopyButton>
                </ShareLink>
                <Centered>
                    <FormattedMessage id="or" />
                </Centered>
                    
                    
                </Grid.Column>
            </Grid.Row>
            <ButtonContainer>
                <BasicButton
                    disabled={false}
                    primary
                    fluid
                    onClick= { () => this.onClickShareViaWhatsapp(this.state.data.message) }
                >
                    <FormattedMessage id="referral.send.btn.whatsapp.text" />
                </BasicButton>
            </ButtonContainer>
            </Grid>
            </Layout>
        );
    }
}

function createMarkup(message) {
  return {__html: message};
}

const mapStateToProps = state => ({
    data: getInviteData(state),
    errors: getErrors(state),
  });
  
  const mapDispatchToProps = dispatch => ({
    getShareData: (userID) => dispatch(onGetInviteData(userID)),
  });
  export default withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(ReferralSend)
  );