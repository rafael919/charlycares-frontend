import { FormattedMessage } from 'react-intl';
import { Grid, Container, Responsive,Divider } from 'semantic-ui-react';
import Background from 'Components/Background';
import BasicButton from 'Components/Buttons/Basic';
import Heading from 'Components/Heading';
import FullHeight from 'Components/FullHeight';
import React from 'react';
import PaymentItem from '../../components/PaymentItem';
import moment from 'moment';
import memoizeWith from 'ramda/es/memoizeWith';

import backgroundImg from 'Assets/images/website-frontpage.jpg';
import checkIcon from 'Assets/icons/icn-check-blue.svg';
import styled from 'styled-components';
const Icon = styled.img``;

class PaymentCheckNoResult extends React.Component {
  static defaultProps = {
    payments: [],
  };
  state = {
    hasMore: true,
    totalNumOfPages: 0,
    jumpBy: 5,
    payments: [{id : 1,total_amount : 20},{id : 2,total_amount : 20}],
    currentIndex: 0,
    selectedYear: null,
  };
  renderPaymentsList = () => {
    return this.state.payments.map(payment => {
      console.log(payment.id)
      const date = moment(payment.start_date, 'YYYY-MM-DD HH:mm:ss');
      return (
        <PaymentItem bottomBorder = {false} 
          key={payment.id}
          angel
          onSelect={this.onPaymentSelect(payment.id)}
          // img={payment.family[0].image}
          description={date.clone().format('dddd')}
          date={date.clone().format('MMMM DD, YYYY')}
          sum={payment.total_amount}
          paymentDesc={payment.current_state}
        />
      );
    });
  };
  onPaymentSelect = memoizeWith(
    
  );
  render () {
    return (
      <div style = {{backgroundColor : '#fff'}}>
      <Container as={FullHeight} fluid>
          <Responsive maxWidth={990}>
            <Background src={backgroundImg} />
          </Responsive>
          <Grid padded as={FullHeight}>
            <Grid.Column
              only="computer"
              stretched
              computer={5}
              largeScreen={5}
              widescreen={1}
            >
              <Background src={backgroundImg} />
            </Grid.Column>
            <Grid.Column
              verticalAlign="middle"
              computer={11}
              tablet={16}
              mobile={16}
              largeScreen={10}
              widescreen={9}
            >
              <Grid centered verticalAlign="middle" >
               
                <Grid.Row>
                  <Grid.Column
                    computer={12}
                    tablet={16}
                    mobile={16}
                    largeScreen={9}
                    textAlign="center"
                  >
                    <Responsive maxWidth={990}>
                      <Heading secondary as="h3">
                        <FormattedMessage id="payment.success.heading" />
                      </Heading>
                    </Responsive>
                    <Responsive minWidth={990}>
                      <div style = {{color : 'black',fontSize : 18,marginTop : 50}}>
                        <FormattedMessage id="payment.success.heading" />
                      </div>
                      <Divider />
                      <div style = {{marginTop : 30,marginBottom : 30}}>
                      <Grid verticalAlign = "center" >
                        <Grid.Row columns = {2}>
                          <Grid.Column textAlign = "left" computer={2} mobile={16} tablet={14}>
                            <div style ={{width : 18,height : 18,marginTop : -5}}>
                                <Icon src={checkIcon}/>
                              </div>
                          </Grid.Column>
                          <Grid.Column textAlign="left" computer={8} mobile={16} tablet={14}>
                            <div style ={{color : 'rgb(57,56,62)',fontSize : 16,fontWeight : '500'}}>
                                <FormattedMessage id= "payment.success.subheading" />
                            </div>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns = {1}>
                          <Grid.Column textAlign = "left" computer={12} mobile={16} tablet={14}>
                            <BasicButton
                                disabled={false}
                                primary
                                fluid
                              >
                              <FormattedMessage id="payment.success.btn.booking" />
                            </BasicButton>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      </div>
                    </Responsive>
                  </Grid.Column>
                </Grid.Row>
                
              </Grid>
            </Grid.Column>
          </Grid>
        </Container>
        </div>
    );
  }
  
};

export default PaymentCheckNoResult;
