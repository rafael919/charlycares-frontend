import { injectIntl, FormattedMessage } from 'react-intl';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow'
import BasicButton from 'Components/Buttons/Basic';
import Layout from 'Components/Layout';
import NoFee from './components/NoFee';
import ButtonsContainer from './components/ButtonsContainer';
import React, { Component } from 'react';
import Divider from 'Components/Divider';
import Explanation from './components/Explanation';
import Footer from './components/Footer';
import Header from './components/Header';

class HowItWorks extends Component {
  navigateToBooking = () => {
    this.props.history.push('/booking');
  };
  navigateToFreeTrial = () => {
    this.props.history.push('/connect-payment');
  };

  render() {
    console.log(this.props.location.state);
    return (
      <Layout
        navTitle={this.props.intl.formatMessage({
          id: 'signup.family.sixthStep.headerMobile',
        })}
        onNavBack={this.props.location.from === 'booking/create' ? this.props.history.goBack : null}
        navBorder
      >
        <CustomRow>
          <CustomColumn>
          <Explanation>
              <FormattedMessage id="signup.family.sixthStep.descFreeMonth" />
          </Explanation>
          <ButtonsContainer>
              <BasicButton onClick={this.navigateToFreeTrial} fluid primary>
                {this.props.intl.formatMessage({
                  id: 'signup.family.sixthStep.btnTrial',
                })}
              </BasicButton>
              <BasicButton basicBtn onClick={this.navigateToBooking} fluid>
                {this.props.intl.formatMessage({
                  id: 'signup.family.sixthStep.btnLater',
                })}
              </BasicButton>

            </ButtonsContainer>
            <Divider inner />
            <Header>
              <FormattedMessage id="signup.family.sixthStep.explanationUspHeader" />
            </Header>
            <NoFee
              text={this.props.intl.formatMessage({
                id: 'signup.family.sixthStep.usp1',
              })}
            />
            <NoFee
              text={this.props.intl.formatMessage({
                id: 'signup.family.sixthStep.usp2',
              })}
            />
            <NoFee
              text={this.props.intl.formatMessage({
                id: 'signup.family.sixthStep.usp3',
              })}
            />
            <NoFee
              text={this.props.intl.formatMessage({
                id: 'signup.family.sixthStep.usp4',
              })}
            />
            <Footer>
              <FormattedMessage id="signup.family.sixthStep.contact" />
            </Footer>
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

export default injectIntl(HowItWorks);
