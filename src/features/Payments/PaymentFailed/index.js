import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ContentWrapper from 'Components/ContentWrapper';
import memoizeWith from 'ramda/es/memoizeWith';
import CustomRow from 'Components/CustomRow';
import InfiniteScroll from 'react-infinite-scroller';
import Layout from 'Components/Layout';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { ProgressivePaymentsCheck } from 'Components/Progressive';

import { getErrors } from '../../../ui/selectors';
import { Grid } from 'semantic-ui-react';
import checkIcon from 'Assets/icons/check.svg';
import styled from 'styled-components';
import PaymentItem from '../components/PaymentItem';
import PaymentsList from './Desktop/components/PaymentsList';
import BasicButton from 'Components/Buttons/Basic';
import { getOutstandingPayments } from '../PaymentCheck/selectors';
import { onGetoutStandingPayments } from '../PaymentCheck/action';
import { withRouter } from 'react-router-dom';
import closeButton from 'Assets/icons/btn-large-close.svg';
import pinkCheckIcon from 'Assets/icons/check.svg'
import { Redirect } from 'react-router-dom';

const Icon = styled.img``;

class PaymentFailed extends PureComponent {
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
  renderNoResults = () =>{
    if(this.state.redirect){
      return <Redirect to="/booking" />;
    }
    return (
      <CustomRow>
        <div style = {{height : 20,backgroundColor : 'rgb(249,248,249)',borderWidth : 1 , borderColor : 'rgb(231,231,231)'}} />
        <div style = {{marginTop : 30,marginBottom : 30}}>
          <Grid centered >
            <Grid.Row columns = {2}>
              <Grid.Column textAlign = "left" computer={1} mobile={2} tablet={14}>
                <div style ={{width : 18,height : 18,marginTop : 0}}>
                    <Icon src={checkIcon}/>
                  </div>
              </Grid.Column>
              <Grid.Column textAlign="left" computer={8} mobile={12} tablet={14}>
                <div style ={{color : '#313138',fontSize : 15,fontWeight : '400'}}>
                    <FormattedMessage id= "payment.noPayments.subheading" />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns = {1}>
              <Grid.Column textAlign="left" computer={8} mobile={14} tablet={14}>
                <div style ={{color : 'rgb(57,56,62)',fontSize : 16,fontWeight : '200'}}>
                    <FormattedMessage id= "payment.noPayments.description" />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns = {1}>
              <Grid.Column textAlign = "left" computer={8} mobile={13} tablet={14}>
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
  OnClickPayNow = () => {
    window.open(this.state.data.payment_link,'_self')
  }
  render() {
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="payment.failed.heading" />}
      >
      <ContentWrapper>
        <CustomRow noPadding>
          {this.state.error == null ? <div style = {{marginBottom : 10,height : 20,backgroundColor : 'rgb(249,248,249)',borderWidth : 1 , borderColor : 'rgb(231,231,231)'}} /> : null}
          {this.state.error == null ?  
          <Grid centered>
            <Grid.Row columns = {2}>
                <Grid.Column textAlign = "left" computer={2} mobile={2} tablet={14}>
                  <div style ={{width : 8,height : 8,marginTop : -10}}>
                      <Icon src={closeButton}/>
                    </div>
                </Grid.Column>
                <Grid.Column textAlign="left" computer={12} mobile={13} tablet={14}>
                  <div style ={{color : '#313138',fontSize : 15,fontWeight : '500'}}>
                      <FormattedMessage id= "payment.failed.subheading" />
                  </div>
                </Grid.Column>
              </Grid.Row>
                <Grid.Row textAlign = "left" columns = {1}>
                  <Grid.Column textAlign="left" computer={16} mobile={15} tablet={16}>
                    <div style ={{color : '#323235',fontSize : 15,fontWeight : '300'}}>
                        <FormattedMessage id= "payment.link.problem.text" />
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row textAlign = "left" columns = {1}>
                <Grid.Column textAlign="left" computer={8} mobile={15} tablet={16}>
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
                  <div style = {{height : 20,width : '100%',backgroundColor : 'rgb(249,248,249)',borderWidth : 1 , borderColor : 'rgb(231,231,231)'}} />
              </Grid> : null}
            {this.state.data != null ? (this.state.data.outstanding_payments.length > 0 ?
            <div>
            <Grid.Column textAlign="center" computer={15} mobile={15} tablet={16}>
              <PaymentsList>
                <InfiniteScroll
                  pageStart={1}
                  loadMore = {this.loadMore}
                >
                  {this.renderPaymentsList()}
                </InfiniteScroll>
              </PaymentsList>
              </Grid.Column>
              <Grid centered>
                <Grid.Row columns = {2}>
                  <Grid.Column textAlign="center" computer={7} mobile={8} tablet={7}>
                    <CustomRow>
                        <div style ={{color : '#3A3A40',fontWeight : '300',fontSize : 13,marginBottom : 2}}>
                            <FormattedMessage id="payment.total.text" />
                        </div>
                    </CustomRow>
                    <CustomRow>
                        <div style = {{color :'rgb(255,0,28)',fontSize : 22,fontWeight : '500',textAlign : 'center'}}>
                            €{Math.round(this.state.data.payment_sum * 100)/100}
                        </div>
                    </CustomRow>
                      </Grid.Column>
                  <Grid.Column textAlign="left" computer={7} mobile={7} tablet={7}>
                  <div style = {{marginTop : 5}}>
                      <BasicButton
                          disabled={false}
                          primary
                          fluid
                          onClick={this.OnClickPayNow}
                        >
                        <FormattedMessage id="payment.paynow.text" />
                      </BasicButton>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid> 
              </div> : <this.renderNoResults />) :  (this.state.error == null ?
               <div style = {{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'

                }}>
                  <ProgressivePaymentsCheck key={1} isLoading={true} width = {370}/>
                  <div style = {{position : 'absolute',justifyContent : 'center',alignItems : 'center'}}>
                  <Grid centered >
                  <Grid.Row columns = {2}>
                    <Grid.Column textAlign = "left" computer={2} mobile={2} tablet={14}>
                      <div style ={{width : 18,height : 18,marginTop : 47}}>
                          <Icon src={pinkCheckIcon}/>
                        </div>
                    </Grid.Column>
                    <Grid.Column textAlign="left" computer={14} mobile={14} tablet={14}>
                      <div style ={{marginLeft : 0,marginTop : 45 ,color : 'rgb(57,56,62)',fontSize : 16,fontWeight : '500'}}>
                          <FormattedMessage id= "checking.payment.text" />
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                  </Grid>
                  </div>
                </div> : <this.renderNoResults /> )
             }
        </CustomRow> 
      </ContentWrapper>
      </Layout>
    );
  }
}

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
