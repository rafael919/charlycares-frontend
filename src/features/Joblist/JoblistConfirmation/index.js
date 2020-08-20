import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import React, { Component } from 'react';

import { getErrors, getLoadingStatus } from '../../../ui/selectors';
import { onAngelAcceptJob } from '../actions';
import { onErrorConfirm } from '../../../ui/actions';
import ConfirmationSection from './components/ConfirmationSection';
import Day from './components/Day';
import DaysList from './components/DaysList';

class JoblistConfirmation extends Component {
  onAccept = () => {
    const payload = {
      booking_id: this.props.location.state.bookingId,
    };

    this.props.onAngelAcceptJob(payload, this.props.history);
  };

  render() {
    return (
      <Layout
        navBorder
        onNavBack={this.props.history.goBack}
        navTitle={<FormattedMessage id="booking.family.confirmation.title" />}
        navSubTitle={
          <FormattedMessage
            id="booking.angel.offers.details.subTitle"
            values={{
              angelId: this.props.location.state.angelId,
              bookingId: this.props.location.state.bookingId,
            }}
          />
        }
      >
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        {this.props.isLoading ? <Loader /> : null}
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <Grid container>
              <CustomRow padding="2.5rem 0 0 0">
                <Header as="h3">
                  <FormattedMessage id="booking.family.confirmation.heading" />
                </Header>
              </CustomRow>
              <CustomRow>
                <DaysList>
                  {this.props.location.state &&
                  this.props.location.state.days.length
                    ? this.props.location.state.days.map((day, i) => {
                        return <Day key={day.id} day={day} />;
                      })
                    : null}
                </DaysList>
              </CustomRow>
            </Grid>
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          <ConfirmationSection
            onConfirm={this.onAccept}
            onCancel={this.props.history.goBack}
          />
        </Confirmation>
      </Layout>
    );
  }
}

export default connect(
  (state, props) => ({
    errors: getErrors(state),
    isLoading: getLoadingStatus(state),
  }),
  {
    onErrorConfirm,
    onAngelAcceptJob,
  }
)(JoblistConfirmation);
