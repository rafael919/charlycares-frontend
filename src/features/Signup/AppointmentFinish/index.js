//@flow

import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import Error from 'Components/Error';
import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import presentIcon from 'Assets/icons/icn-present.svg';
import ButtonsContainer from './components/ButtonsContainer';
import CustomImage from './components/CustomImage';
import Confirmation from './components/Confirmation';
import Description from './components/Description';
import Header from './components/Header';
import PromoContainer from './components/PromoContainer';
import API from '../api';
import { getReferralSettings } from '../selectors';

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
            this.props.history.push('/appointments');
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

  replaceLink = (referralMessage, link) => {
    if (!referralMessage || !link) return '';
    return referralMessage.replace(/{link}/g, encodeURIComponent(link));
  };

  changeAppointment = () => {
    this.props.history.push('/appointments');
  };

  componentDidMount() {
    this.getAppointment();
  }

  render() {
    const { timeslot } = this.state;
    const { referralSettings } = this.props;
    return (
      <Layout
        fluid
        navTitle={<FormattedMessage id="signup.angel.eighthStep.title" />}
        navBorder
        longTitle
      >
        {this.state.isLoading ? <Loader /> : null}
        <Error errors={this.state.error} onErrorRetry={this.getAppointment} />
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
                    {timeslot &&
                      moment(timeslot.start_date).format(
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
                    {timeslot ? timeslot.agenda.address : null}
                  </Paragraph>
                  <Paragraph fontSize="0.9375rem">
                    {timeslot ? timeslot.agenda.postalcode : null},{' '}
                    {timeslot ? timeslot.agenda.city : null}
                  </Paragraph>
                </CustomColumn>
              </CustomRow>
            </Grid>
            <Divider />
            <Grid container>
              <CustomRow>
                <CustomColumn padding="1.4rem 0rem 0 0">
                  <Header as="h5">
                    <FormattedMessage id="signup.angel.seventhStep.editAppointmentTitle" />
                  </Header>
                  <Paragraph margin="0.4em" fontSize="0.9375rem">
                    <FormattedMessage id="signup.angel.seventhStep.editAppointmentDesc" />
                  </Paragraph>
                  <Confirmation>
                    <Confirmation.LeftButton onClick={this.cancelAppointment} >
                      <FormattedMessage id="signup.angel.seventhStep.cancelAppointment" />
                    </Confirmation.LeftButton>
                    <Confirmation.LeftButton onClick={this.changeAppointment}>
                      <FormattedMessage id="signup.angel.seventhStep.editAppointment" />
                    </Confirmation.LeftButton>
                  </Confirmation>
                </CustomColumn>
              </CustomRow>
            </Grid>
            <Divider />
            {referralSettings && (
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
                      <Description>{referralSettings.content}</Description>
                    </PromoContainer>
                  </CustomColumn>
                </CustomRow>
                <CustomRow>
                  <CustomColumn noPadding>
                    <Paragraph fontSize="0.875rem">
                      {referralSettings.title}
                    </Paragraph>
                    <ButtonsContainer>
                      <BasicButton
                        as="a"
                        primary
                        href={`whatsapp://send?text=${this.replaceLink(
                          referralSettings.message,
                          referralSettings.link
                        )}`}
                      >
                        <FormattedMessage id="signup.angel.eighthStep.whatsapp" />
                      </BasicButton>
                      <BasicButton
                        as="a"
                        primary
                        href={`sms://&body=${this.replaceLink(
                          referralSettings.message,
                          referralSettings.link
                        )}`}
                      >
                        <FormattedMessage id="signup.angel.eighthStep.sms" />
                      </BasicButton>
                      <BasicButton
                        as="a"
                        primary
                        href={`mailto:?subject=${
                          referralSettings.mailSubject
                        }&body=${referralSettings.text}`}
                      >
                        <FormattedMessage id="signup.angel.eighthStep.email" />
                      </BasicButton>
                    </ButtonsContainer>
                  </CustomColumn>
                </CustomRow>
              </Grid>
            )}
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  referralSettings: getReferralSettings(state),
});

export default connect(mapStateToProps)(AppointmentFinish);
