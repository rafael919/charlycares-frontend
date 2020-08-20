import { FormattedMessage } from 'react-intl';
import { Grid, Container, Responsive, Divider } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import Background from 'Components/Background';
import BasicButton from 'Components/Buttons/Basic';
import Heading from 'Components/Heading';
import FullHeight from 'Components/FullHeight';
import React from 'react';
import { ProgressivePaymentsCheck } from 'Components/Progressive';
import PaymentItem from '../../components/PaymentItem';
import PaymentsList from '../Desktop/components/PaymentsList';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import memoizeWith from 'ramda/es/memoizeWith';

import backgroundImg from 'Assets/images/website-frontpage.jpg';
import closeButton from 'Assets/icons/btn-large-close.svg';
import styled from 'styled-components';
import { getOutstandingPayments } from '../../PaymentCheck/selectors';
import { onGetoutStandingPayments } from '../../PaymentCheck/action';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import pinkCheckIcon from 'Assets/icons/check.svg'
import checkIcon from 'Assets/icons/icn-check-blue.svg';
import { getErrors } from '../../../../ui/selectors';
const Icon = styled.img``;

class PaymentFailed extends React.Component {
  referenceNo = ""
  static defaultProps = {
    payments: [],
    data: null,
    outStandingPayments : null
  };
  state = {
    hasMore: true,
    totalNumOfPages: 0,
    jumpBy: 5,
    payments: [],
    data : null,
    currentIndex: 0,
    selectedYear: null,
    isLoading : false,
    dataLoaded : false,
    redirect : false,
    error : null
  };

  componentDidMount (){
    // const parts = this.props.match.path.split('/')
    const parts = window.location.href.split('/')
    this.referenceNo = parts[parts.length - 1]
    this.referenceNo = this.referenceNo.replace(/[{()}]/g, '')   // remove curly braces if any
    this.setState({isLoading : true,redirect : false})
    this.props.getOutStandingPayments(this.referenceNo)
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
  OnClick_Booking = () => {
    this.setState({redirect : true})
  }
  OnClickPayNow = () => {
    window.open(this.state.data.payment_link,'_self')
  }
  renderNoResults = () =>{
    if(this.state.redirect){
      return <Redirect to="/booking" />;
    }
    return (
        <div style = {{marginTop : 30,marginBottom : 30}}>
          <Grid centered >
            <Grid.Row columns = {2}>
              <Grid.Column textAlign = "left" computer={2} mobile={16} tablet={14}>
                <div style ={{width : 18,height : 18,marginTop : -5}}>
                    <Icon src={checkIcon}/>
                  </div>
              </Grid.Column>
              <Grid.Column textAlign="left" computer={12} mobile={12} tablet={14}>
                <div style ={{color : '#313138',fontSize : 15,fontWeight : '400'}}>
                    <FormattedMessage id= "payment.noPayments.subheading" />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns = {1}>
              <Grid.Column textAlign="left" computer={14} mobile={12} tablet={14}>
                <div style ={{color : 'rgb(57,56,62)',fontSize : 16,fontWeight : '200'}}>
                    <FormattedMessage id= "payment.noPayments.description" />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns = {1}>
              <Grid.Column textAlign = "left" computer={8} mobile={16} tablet={14}>
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
    )
  }
  renderPaymentsList = () => {
    return this.state.data.outstanding_payments.map(payment => {
      const date = moment(payment.created_at, 'YYYY-MM-DD HH:mm:ss');
      return (
        <PaymentItem bottomBorder = {true} 
          key={payment.id}
          onSelect={this.onPaymentSelect(payment.id)}
          img={payment.image}
          description={payment.invoice_prefix+payment.invoice_number}
          date={date.clone().format('MMMM DD, YYYY')}
          sum={payment.total_amount}
          warning = {payment.reason}
        />
      );
    });
  };
  onPaymentSelect = memoizeWith(
    
  );
  loadMore = page => {
  }
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
                        <FormattedMessage id="payment.failed.heading" />
                      </Heading>
                    </Responsive>
                    <Responsive minWidth={990}>
                      <div style = {{color : 'black',fontSize : 18,marginTop : 50}}>
                        <FormattedMessage id="payment.failed.heading" />
                      </div>
                      <Divider />
                        <Container>
                        
                        {this.state.error == null ? <Grid >
                          <Grid.Row columns = {2}>
                            <Grid.Column textAlign = "left" computer={2} mobile={16} tablet={14}>
                              <div style ={{width : 18,height : 18,marginTop : -10}}>
                                  <Icon src={closeButton}/>
                                </div>
                            </Grid.Column>
                            <Grid.Column textAlign="left" computer={12} mobile={16} tablet={14}>
                              <div style ={{color : '#313138',fontSize : 15,fontWeight : '500'}}>
                                  <FormattedMessage id= "payment.failed.subheading" />
                              </div>
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row textAlign = "left" columns = {1}>
                            <Grid.Column textAlign="left" computer={16} mobile={16} tablet={16} >
                              <div style ={{color : '#323235',fontSize : 15,fontWeight : '300',marginTop : -10}}>
                                  <FormattedMessage id= "payment.link.problem.text" />
                              </div>
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row textAlign = "left" columns = {1}>
                          <Grid.Column textAlign="left" computer={14} mobile={16} tablet={16}>
                            <Grid.Row>
                              <div style ={{color : '#29292d',fontSize : 15,fontWeight : '500',marginTop : -10,marginBottom : 2}}>
                                  <FormattedMessage id="payment.link.plaform_name" />
                              </div>
                            </Grid.Row>
                            <Grid.Row>
                              <div style ={{color : '#323235',fontSize : 15,fontWeight : '300'}}>
                                <FormattedMessage id="payment.link.contact.Phone" />
                              </div>
                            </Grid.Row>
                            <Grid.Row>
                              <div style ={{color : '#323235',fontSize : 15,fontWeight : '300'}}>
                                <FormattedMessage id="payment.link.contanct.Whatsapp" />
                              </div>
                            </Grid.Row>
                            <Grid.Row>
                              <div style ={{color : '#323235',fontSize : 15,fontWeight : '300',marginTop : 20}}>
                                <FormattedMessage id="payment.failed.tryagain" />
                              </div>
                            </Grid.Row>

                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                          </Grid.Row>
                        </Grid> : null}
                        {this.state.data != null ? (this.state.data.outstanding_payments.length > 0 ?  
                        <Grid centered verticalAlign="middle">
                        <PaymentsList>
                          <InfiniteScroll
                            pageStart={1}
                            loadMore = {this.loadMore}
                          >
                            {this.renderPaymentsList()}
                          </InfiniteScroll>
                        </PaymentsList>
                        
                        <Grid.Row columns = {1}>
                            <Grid.Column textAlign="center" computer={7} mobile={16} tablet={16}>
                              <Grid.Row>
                                <div style ={{color : '#3A3A40',fontWeight : '300',fontSize : 13,marginBottom : 2}}>
                                    <FormattedMessage id="payment.total.text" />
                                </div>
                              </Grid.Row>
                              <Grid.Row>
                                <div style = {{color :'rgb(255,0,28)',fontSize : 22,fontWeight : '500',textAlign : 'center'}}>
                                    €{Math.round(this.state.data.payment_sum * 100)/100}
                                </div>
                              </Grid.Row>
                                </Grid.Column>
                            <Grid.Column textAlign="left" computer={7} mobile={16} tablet={16}>
                                <BasicButton
                                    disabled={false}
                                    primary
                                    fluid
                                    onClick = {this.OnClickPayNow}
                                  >
                                  <FormattedMessage id="payment.paynow.text" />
                                </BasicButton>
                            </Grid.Column>
                            </Grid.Row>
                            </Grid>
                          
                        : <this.renderNoResults />) : (this.state.error == null ?
                        <div style = {{
                        width: '100%',
                        height: 350,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'

                      }}>
                        <ProgressivePaymentsCheck key={1} isLoading={true} width = {420}/>
                        <div style = {{position : 'absolute',justifyContent : 'center',alignItems : 'center'}}>
                        <Grid verticalAlign = "middle" >
                        <Grid.Row columns = {2}>
                          <Grid.Column textAlign = "left" computer={2} mobile={16} tablet={14}>
                            <div style ={{width : 18,height : 18,marginTop : 47}}>
                                <Icon src={pinkCheckIcon}/>
                              </div>
                          </Grid.Column>
                          <Grid.Column textAlign="left" computer={14} mobile={16} tablet={14}>
                            <div style ={{marginLeft : 0,marginTop : 45,color : 'rgb(57,56,62)',fontSize : 16,fontWeight : '500'}}>
                                <FormattedMessage id= "checking.payment.text" />
                            </div>
                          </Grid.Column>
                        </Grid.Row>
                        </Grid>
                        </div>
                      </div> : <this.renderNoResults /> )
                      }
                      </Container>
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

const mapStateToProps = state => ({
  data: getOutstandingPayments(state),
  errors: getErrors(state),
});

const mapDispatchToProps = dispatch => ({
  getOutStandingPayments: (referenceNo) => dispatch(onGetoutStandingPayments(referenceNo)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PaymentFailed)
);
