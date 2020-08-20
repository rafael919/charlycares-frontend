//@flow

import { FormattedMessage } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import { Redirect } from 'react-router-dom';
import { onMakeAppointment, onErrorReset } from '../actions';
import type { Dispatch } from 'redux';
import {
  getSelectedAgenda,
  getSelectedTimeslot,
  getErrors,
  getLoadingStatus,
  getConfirmedTimeslot,
} from '../selectors';
import { connect } from 'react-redux';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import Error from 'Components/Error';
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
  onErrorReset: Function,
  selectedTimeslot: Object,
  selectedAgenda: Object,
  confrimedTimeslot?: number,
};

class SeventhStepAngel extends Component<Props> {
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.confrimedTimeslot &&
      prevProps.confrimedTimeslot !== this.props.confrimedTimeslot
    ) {
      this.props.history.push('/appointment-finish');
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
    if (!this.props.selectedTimeslot) {
      return <Redirect to="/appointments" />;
    }
    return (
      <Layout
        onNavBack={this.props.history.goBack}
        navTitle={<FormattedMessage id="signup.angel.seventhStep.title" />}
      >
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorReset}
        />
        {this.props.isLoading && <Loader />}
        <CustomRow noPadding>
          <CustomColumn noPadding width={16}>
            <Divider />
            <Grid container>
              <CustomRow borderBottom>
                <CustomColumn padding="1.4rem 0">
                  <Paragraph fontSize="0.9375rem">
                    <FormattedMessage id="signup.angel.seventhStep.description" />
                  </Paragraph>
                </CustomColumn>
              </CustomRow>
              <CustomRow borderBottom>
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
              <CustomRow>
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
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          <Confirmation.LeftButton onClick={this.props.history.goBack}>
            <FormattedMessage id="signup.angel.seventhStep.cancel" />
          </Confirmation.LeftButton>
          <Confirmation.RightButton onClick={this.onAppointment}>
            <FormattedMessage id="signup.angel.seventhStep.confirm" />
          </Confirmation.RightButton>
        </Confirmation>
      </Layout>
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
  onErrorReset: () => dispatch(onErrorReset()),
  onMakeAppointment: (id: number) => dispatch(onMakeAppointment(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeventhStepAngel);
