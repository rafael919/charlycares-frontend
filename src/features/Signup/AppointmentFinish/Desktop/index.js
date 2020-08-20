//@flow

import { FormattedMessage } from 'react-intl';
import { Grid, Divider} from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import Loader from 'Components/Loader';
import DesktopError from 'Components/DesktopError';
import React, { Component } from 'react';
import moment from 'moment';

import API from '../../api';

import Header from './components/Header';
import Confirmation from './components/Confirmation'; 
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

class AppointmentFinish extends Component<Props> {
  state = {
    timeslot: null,
    isLoading: false,
    error: null,
  };

  onScreenClose = () => {
    this.props.history.replace('/appointments');
  };

  getAppointment = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        API.appointment()
          .then(({ data }) => {
            this.setState({
              timeslot: data.data.appointment.agenda_timeslot,
              isLoading: false,
            });
          })
          .catch(err => {
            this.setState({
              error: err,
              isLoading: false,
            });
          });
      }
    );
  };

  cancelAppointment = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        API.cancelAppointment()
          .then(({ data }) => {
            this.setState({
              isLoading: false,
            });
            this.props.history.push('/appointments')
          })
          .catch(err => {
            this.setState({
              error: err,
              isLoading: false,
            });
          });
      }
    );
  };

  changeAppointment = () => {
    this.props.history.push('/appointments'); 
  };

  componentDidMount() {
    this.getAppointment();
  }

  render() {
    const { timeslot } = this.state;

    return (
      <DesktopWelcomeLayout withLogo>
        {this.state.isLoading ? <Loader /> : null}
        <DesktopError
          errors={this.state.error}
          onErrorRetry={this.getAppointment}
        />
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
              {timeslot &&
                moment(timeslot.start_date).format(
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
              {timeslot ? timeslot.agenda.address : null}
            </Paragraph>
            <Paragraph fontSize="0.9375rem">
              {timeslot ? timeslot.agenda.postalcode : null},{' '}
              {timeslot ? timeslot.agenda.city : null}
            </Paragraph>
          </Grid.Column>
        </Grid.Row>
        <Divider style={{marginRight: '25%', marginLeft: '25%'}} />
        
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Header as="h5">
              <FormattedMessage id="signup.angel.seventhStep.editAppointmentTitle" />
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Paragraph margin="0rem" fontSize="0.75rem">
              <FormattedMessage id="signup.angel.seventhStep.editAppointmentDesc" />
            </Paragraph>
            <Confirmation>
              <Confirmation.LeftButton onClick={this.cancelAppointment}>
                <FormattedMessage id="signup.angel.seventhStep.cancelAppointment" />
              </Confirmation.LeftButton>
              <Confirmation.LeftButton onClick={this.changeAppointment}>
                <FormattedMessage id="signup.angel.seventhStep.editAppointment" />
              </Confirmation.LeftButton>
            </Confirmation>
          </Grid.Column>
        </Grid.Row>

            
      </DesktopWelcomeLayout>
    );
  }
}

export default AppointmentFinish;
