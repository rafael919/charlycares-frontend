import { FormattedMessage } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import { connect } from 'react-redux';
import { getErrors, getLoadingStatus } from '../../../ui/selectors';
import { onErrorConfirm } from '../../../ui/actions';
import { onAngelDeclineBooking } from '../data/actions';
import Confirmation from 'Components/Confirmation';
import Error from 'Components/Error';
import Loader from 'Components/Loader';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import React, { PureComponent } from 'react';

import ConfirmationSection from './components/ConfirmationSection';
import Message from './components/Message';
import Reason from './components/Reason';
import ReasonsList from './components/ReasonsList';

class AngelBookingDecline extends PureComponent {
  state = {
    reasons: [
      'blockAgenda',
      'blockFamily',
      'tooLong',
      'tooShort',
      'noFixedRequests',
      'tooFar',
      'tooManyChildren',
    ],
    selectedReason: '',
    message: '',
  };

  onReasonSelect = reason => () => {
    this.setState({
      selectedReason: reason,
    });
  };

  onCancel = () => {
    this.props.history.goBack();
  };

  onConfirm = () => {
    if (this.state.selectedReason.length > 0) {
      const payload = {
        reason: this.state.selectedReason,
        message: this.state.message,
      };

      this.props.onAngelDeclineBooking(
        this.props.location.state.invitationId,
        this.props.history,
        payload
      );
    }
  };

  onMessageChange = e => {
    this.setState({
      message: e.target.value,
    });
  };

  render() {
    const {
      state: { angelId, bookingId },
    } = this.props.location;
    return (
      <Layout
        navBorder
        onNavBack={this.props.history.goBack}
        navTitle={<FormattedMessage id="navigation.tabs.booking" />}
        navSubTitle={
          <FormattedMessage
            id="booking.angel.offers.details.subTitle"
            values={{ angelId, bookingId }}
          />
        }
      >
        <Error
          onErrorConfirm={this.props.onErrorConfirm}
          errors={this.props.errors}
        />
        {this.props.isLoading && <Loader />}
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <Grid container>
              <CustomRow padding="2.5rem 0 0 0">
                <Header as="h3">
                  <FormattedMessage id="booking.angel.decline.reasonTitle"/>
                </Header>
              </CustomRow>
              <CustomRow padding="1rem 0 0 0">
                <Paragraph light fontSize="0.9375rem">
                 <FormattedMessage id="booking.angel.decline.reasonExplanation"/>
                </Paragraph>
              </CustomRow>
              <CustomRow>
                <ReasonsList>
                  {this.state.reasons.map((r, i) => {
                    return (
                      <Reason
                        value={r}
                        key={i}
                        selectedReason={this.state.selectedReason}
                        onSelect={this.onReasonSelect(r)}
                      />
                    );
                  })}
                </ReasonsList>
              </CustomRow>
              <CustomRow padding="0 0 6rem 0">
                <Message
                  value={this.state.message}
                  onMessageChange={this.onMessageChange}
                />
              </CustomRow>
            </Grid>
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          <ConfirmationSection
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
            selectedReason={this.state.selectedReason.length > 0}
          />
        </Confirmation>
      </Layout>
    );
  }
}

export default connect(
  state => ({
    errors: getErrors(state),
    isLoading: getLoadingStatus(state),
  }),
  {
    onAngelDeclineBooking,
    onErrorConfirm,
  }
)(AngelBookingDecline);
