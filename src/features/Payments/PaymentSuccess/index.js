
import { FormattedMessage } from 'react-intl';
import CustomRow from 'Components/CustomRow';
import Layout from 'Components/Layout';
import React, { PureComponent } from 'react';
import ContentWrapper from 'Components/ContentWrapper';
import { Grid } from 'semantic-ui-react';
import checkIcon from 'Assets/icons/icn-check-blue.svg';
import styled from 'styled-components';
import BasicButton from 'Components/Buttons/Basic';
import { Redirect } from 'react-router-dom';

const Icon = styled.img``;

class PaymentSuccess extends PureComponent {
  referenceNo = ""
  state = {
    redirect: false,
  }
  componentDidMount () {
    this.setState({redirect : false})
  }
  OnClick_Booking = () => {
    this.setState({redirect : true})
  }
  render() {
    if(this.state.redirect){
      return <Redirect to="/booking" />;
    }
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="payment.success.heading" />}
        onNavClose = {this.props.history.goBack}
      >
      <ContentWrapper>
        <CustomRow noPadding>
          <div style = {{height : 20,backgroundColor : 'rgb(249,248,249)',borderWidth : 1 , borderColor : 'rgb(231,231,231)'}} />
          <div style = {{marginTop : 30,marginBottom : 30}}>
            <Grid centered>
              <Grid.Row columns = {2}>
                <Grid.Column textAlign = "left" computer={2} mobile={2} tablet={14}>
                  <div style ={{width : 18,height : 18,marginTop : -5}}>
                      <Icon src={checkIcon}/>
                    </div>
                </Grid.Column>
                <Grid.Column textAlign="left" computer={8} mobile={12} tablet={14}>
                  <div style ={{color : '#313138',fontSize : 15,fontWeight : '400'}}>
                      <FormattedMessage id= "payment.success.subheading" />
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns = {1}>
                <Grid.Column textAlign = "left" computer={12} mobile={14} tablet={14}>
                  <BasicButton
                      disabled={false}
                      primary
                      fluid
                      onClick = {this.OnClick_Booking}
                    >
                    <FormattedMessage id="payment.success.btn.booking" />
                  </BasicButton>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </CustomRow>
      </ContentWrapper>
      </Layout>
    );
  }
}

export default PaymentSuccess

