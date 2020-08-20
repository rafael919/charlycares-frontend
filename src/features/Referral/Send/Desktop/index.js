import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import BasicButton from 'Components/Buttons/Basic';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import React, { Component } from 'react';
import presentIcon from 'Assets/icons/icn-present.svg';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';
import { getInviteData } from '../selectors';
import { getErrors } from '../../../../ui/selectors';
import { onGetInviteData } from '../action';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

const CustomImage = styled(Image)`
  &&& {
    margin-right: 0.9375rem;
  }
`;


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
    OnClickCopyLink = () =>{
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
    OnClickShareViaEmail = (subject,message) => {
        if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'testing') {  
            window.analytics.track('UShareReferral', {
                role: this.state.data.role,
                method: 'email'
            });
        }
        window.location.href = `mailto:?subject=${subject}&body=${message}`;
    }
    
    OnClickShareViaWhatsapp = (message) => {
        if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'testing') {  
            window.analytics.track('UShareReferral', {
                role: this.state.data.role,
                method: 'whatsapp'
            });
        }
        window.open("https://api.whatsapp.com/send?text="+message);
    }
    render() {
        return (
        <div style = {{backgroundColor : '#fff'}}>
        <DesktopWelcomeLayout withLogo>
            <Grid.Row columns={2}>
                <Grid.Column computer={1} mobile={16} tablet={16}>
                    <div style = {{width : 40 , height : 40}}>
                        <CustomImage src={presentIcon}/>
                    </div>
                </Grid.Column>
                <Grid.Column computer={6} mobile={16} tablet={16}>
                    <div style = {{ color : 'rgb(48,47,54)',fontSize : 20,fontWeight : '700',marginTop : 2}}>
                        {this.state.data != null ? this.state.data.title : "loading .. "}
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign = "middle">
            <Grid.Column computer={5} mobile={16} tablet={16}>
                <div style = {{color : 'rgb(90,90,95)',fontSize : 15,marginTop : -25}}>
                    {this.state.data != null ? this.state.data.subtitle : "loading .."}
                </div>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign = "middle">
            <Grid.Column computer={7} mobile={16} tablet={16}>
                <div style = {{color : 'rgb(48,47,54)',fontWeight : '700',fontSize : 15}}>
                    {this.state.data != null ? this.state.data.subheader :"loading .."}
                </div>
            </Grid.Column>
            </Grid.Row> 
            <Grid.Row textAlign = "middle">
                <Grid.Column computer={7} mobile={16} tablet={16}>
                    <div style = {{color : "rgb(90,90,95)",whiteSpace : 'pre-wrap',display : 'block',fontSize : 15,marginTop : -20}} >
                        {this.state.data != null ? this.state.data.content : ""}
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign = "middle">
                <Grid.Column computer={8} mobile={16} tablet={16}>
                    <div style = {{display : 'flex',backgroundColor : '#e6e6e6',marginLeft : 20,marginTop : 10,borderRadius : 30,width : 420,height : 40,flexDirection : 'row',justifyContent : 'space-between',alignItems : 'center'}}>
                        <div style = {{height : '60%', width : '100%',marginLeft : 20,outline : 'none',fontSize : 14,color : '#A1A2A4',backgroundColor : 'transparent',borderColor : 'transparent'}} id = "link" >{this.state.data != null ? this.state.data.link : "loading .."}</div>
                        <div style = {{marginRight : 20,fontSize : 16,color : '#EE6B88',borderColor : 'transparent',cursor : 'pointer',marginTop : -5}} onClick = {this.OnClickCopyLink}>copy</div>
                    </div>
                </Grid.Column>
            </Grid.Row>
            <div style = {{color : 'rgb(90,90,95)',fontSize : 15,marginTop : 10}}>
                Or
            </div>
            <Grid.Row columns = {2}>
                <Grid.Column textAlign = "left" computer={4} mobile={16} tablet={14}>
                <div style = {{marginTop: -20}}>
                <BasicButton
                    disabled={false}
                    primary
                    fluid
                    onClick = {()=>this.OnClickShareViaWhatsapp(this.state.data.message)}
                    >
                    <FormattedMessage id="referral.send.btn.whatsapp.text" />
                </BasicButton>
                    
                </div>
                </Grid.Column>
                <Grid.Column textAlign = "left" computer={4} mobile={16} tablet={14}>
                <div style = {{marginTop: -20}}>
                <BasicButton
                    disabled={false}
                    primary
                    fluid
                    onClick = {()=> this.OnClickShareViaEmail(this.state.data.mail_subject,this.state.data.message)}
                    >
                    <FormattedMessage id="referral.send.btn.email.text" />
                </BasicButton>
                
                    
                </div>
                </Grid.Column>
            </Grid.Row>
            
        </DesktopWelcomeLayout>
        </div>
        );
    }
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