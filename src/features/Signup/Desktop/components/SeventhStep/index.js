//@flow

import { FormattedMessage } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import type { Dispatch } from 'redux';

import { getErrors, getLoadingStatus } from '../../../../../ui/selectors';
import { onErrorConfirm } from '../../../../../ui/actions';
import { onMakeAppointment } from '../../../actions';

import {
  getSelectedAgenda,
  getSelectedTimeslot,
  getConfirmedTimeslot,
} from '../../../selectors';
import { connect } from 'react-redux';
import DesktopError from 'Components/DesktopError';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import Loader from 'Components/Loader';
import moment from 'moment';
import React, { Component } from 'react';

import Confirmation from './Confirmation';

type Props = {
  previous: Function,
  next: Function,
  isLoading: boolean,
  onMakeAppointment: Function,
  errors: Object | string,
  onErrorConfirm: Function,
  selectedTimeslot: Object,
  selectedAgenda: Object,
  confrimedTimeslot?: number,
};

class SeventhStepAngel extends Component<Props> {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.confrimedTimeslot) {
      this.props.next();
    }
  }

  onAppointment = () => {
    this.props.onMakeAppointment(this.props.selectedTimeslot.id);

    if (process.env.NODE_ENV === 'production') {
      window.analytics.track('AScreeningAppointment', {
        appointmentCity: this.props.selectedAgenda.city,
        appointmentDate: this.props.selectedTimeslot.start_date,
        appointmentAddress: this.props.selectedAgenda.address,
        appointmentMailAddress: this.props.selectedAgenda.email,
      });
    }
  };

  render() {
    return (
      <DesktopWelcomeLayout withLogo>
        <DesktopError
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        {this.props.isLoading && <Loader />}
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Header as="h3">
              <FormattedMessage id="signup.angel.seventhStep.title" />
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Paragraph light fontSize="0.9375rem">
              <FormattedMessage id="signup.angel.seventhStep.description" />
            </Paragraph>
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
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Confirmation>
              <Confirmation.LeftButton onClick={this.props.previous}>
                <FormattedMessage id="signup.angel.seventhStep.cancel" />
              </Confirmation.LeftButton>
              <Confirmation.RightButton onClick={this.onAppointment}>
                <FormattedMessage id="signup.angel.seventhStep.confirm" />
              </Confirmation.RightButton>
            </Confirmation>
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
  selectedTimeslot: getSelectedTimeslot(state),
  selectedAgenda: getSelectedAgenda(state),
  confrimedTimeslot: getConfirmedTimeslot(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  onErrorConfirm: () => dispatch(onErrorConfirm()),
  onMakeAppointment: (id: number) => dispatch(onMakeAppointment(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeventhStepAngel);
