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

import { onEmailSignupReset, onSignupFlowFinish } from '../../../actions';
import { getSelectedAgenda, getSelectedTimeslot } from '../../../selectors';
import ButtonsContainer from './components/ButtonsContainer';
import CustomImage from './components/CustomImage';
import Description from './components/Description';
import Header from './components/Header';
import PromoContainer from './components/PromoContainer';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';

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
      <DesktopWelcomeLayout withLogo>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Header as="h3">
              <FormattedMessage id="signup.angel.eighthStep.title" />
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Header as="h5">
              <FormattedMessage id="signup.angel.seventhStep.when" />
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Paragraph fontSize="0.9375rem">
              {this.props.selectedTimeslot &&
                moment(this.props.selectedTimeslot.start_date).format(
                  'dddd, MMMM DD, YYYY | HH:mm'
                )}
            </Paragraph>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Header as="h5">
              <FormattedMessage id="signup.angel.seventhStep.where" />
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Paragraph margin="0.4em" fontSize="0.9375rem">
              {this.props.selectedAgenda.address}
            </Paragraph>
            <Paragraph fontSize="0.9375rem">
              {this.props.selectedAgenda.postalcode},{' '}
              {this.props.selectedAgenda.city}
            </Paragraph>
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EighthStepAngel));
