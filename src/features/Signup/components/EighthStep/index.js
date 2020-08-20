//@flow

import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import { withRouter } from 'react-router-dom';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import moment from 'moment';
import type { Dispatch } from 'redux';

import presentIcon from 'Assets/icons/icn-present.svg';

import { onEmailSignupReset, onSignupFlowFinish } from '../../actions';
import { getSelectedAgenda, getSelectedTimeslot } from '../../selectors';
import ButtonsContainer from './components/ButtonsContainer';
import CustomImage from './components/CustomImage';
import Description from './components/Description';
import Header from './components/Header';
import PromoContainer from './components/PromoContainer';

type Props = {
  previous: Function,
  next: Function,
  onEmailSignupReset: Function,
  onSignupFlowFinish: Function,
  history: Object,
  selectedAgenda: Object,
  selectedTimeslot: Object,
};

class EighthStepAngel extends Component<Props> {
  onScreenClose = () => {
    this.props.onEmailSignupReset();
    this.props.onSignupFlowFinish();
    this.props.history.replace('/appointments');
  };

  render() {
    return (
      <Layout
        fluid
        onNavClose={this.onScreenClose}
        navTitle={<FormattedMessage id="signup.angel.eighthStep.title" />}
      >
        <CustomRow noPadding>
          <CustomColumn noPadding width={16}>
            <Divider />
            <Grid container>
              <CustomRow padding="1rem 0 0 0" borderBottom>
                <CustomColumn padding="1.4rem 0">
                  <Header as="h5">
                    <FormattedMessage id="signup.angel.seventhStep.when" />
                  </Header>
                  <Paragraph fontSize="0.9375rem">
                    {this.props.selectedTimeslot &&
                      moment(this.props.selectedTimeslot.start_date).format(
                        'dddd, MMMM DD, YYYY | HH:mm'
                      )}
                  </Paragraph>
                </CustomColumn>
              </CustomRow>
              <CustomRow padding="0 0 1rem 0">
                <CustomColumn padding="1.4rem 0">
                  <Header as="h5">
                    <FormattedMessage id="signup.angel.seventhStep.where" />
                  </Header>
                  <Paragraph margin="0.4em" fontSize="0.9375rem">
                    {this.props.selectedAgenda.address}
                  </Paragraph>
                  <Paragraph fontSize="0.9375rem">
                    {this.props.selectedAgenda.postalcode},{' '}
                    {this.props.selectedAgenda.city}
                  </Paragraph>
                </CustomColumn>
              </CustomRow>
            </Grid>
            <Divider />
            <Grid container>
              <CustomRow>
                <CustomColumn padding="1.4rem 1rem 0 0">
                  <Header as="h5">
                    <FormattedMessage id="signup.angel.eighthStep.header" />
                  </Header>
                </CustomColumn>
              </CustomRow>
              <CustomRow noPadding>
                <CustomColumn noPadding>
                  <PromoContainer>
                    <CustomImage src={presentIcon} />
                    <Description>
                      <FormattedMessage id="signup.angel.eighthStep.description" />
                    </Description>
                  </PromoContainer>
                </CustomColumn>
              </CustomRow>
              <CustomRow>
                <CustomColumn noPadding>
                  <Paragraph fontSize="0.875rem">
                    <FormattedMessage id="signup.angel.eighthStep.share" />
                  </Paragraph>
                  <ButtonsContainer>
                    <BasicButton as="a" primary href="whatsapp">
                      <FormattedMessage id="signup.angel.eighthStep.whatsapp" />
                    </BasicButton>
                    <BasicButton as="a" primary href="sms">
                      <FormattedMessage id="signup.angel.eighthStep.sms" />
                    </BasicButton>
                    <BasicButton as="a" primary href="email">
                      <FormattedMessage id="signup.angel.eighthStep.email" />
                    </BasicButton>
                  </ButtonsContainer>
                </CustomColumn>
              </CustomRow>
            </Grid>
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  selectedTimeslot: getSelectedTimeslot(state),
  selectedAgenda: getSelectedAgenda(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>): Object => ({
  onEmailSignupReset: () => dispatch(onEmailSignupReset()),
  onSignupFlowFinish: () => dispatch(onSignupFlowFinish()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(EighthStepAngel)
);
