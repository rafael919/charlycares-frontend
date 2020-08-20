import { FormattedMessage } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import { connect } from 'react-redux';
import { onBookingCancel } from '../../data/actions';
import Confirmation from 'Components/Confirmation';
import DesktopError from 'Components/DesktopError';
import Navigation from 'Components/Navigation';
import Loader from 'Components/Loader';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import React, { PureComponent } from 'react';

import ConfirmationSection from '../components/ConfirmationSection';
import Message from '../components/Message';
import Reason from '../components/Reason';
import ReasonsList from '../components/ReasonsList';
import API from '../../data/api';

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
    isLoading: false,
    error: null,
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
      this.setState(
        {
          isLoading: true,
        },
        () => {
          const payload = {
            reason: this.state.selectedReason,
            message: this.state.message,
          };

          API.angelDeclineBooking(
            this.props.location.state.invitationId,
            payload
          )
            .then(res => {
              this.setState({
                isLoading: false,
              });
              this.props.onBookingCancel(res.data.data);
              this.props.history.push('/booking');
            })
            .catch(err => {
              this.setState({
                isLoading: false,
                error: err,
              });
            });
        }
      );
    }
  };

  onMessageChange = e => {
    this.setState({
      message: e.target.value,
    });
  };

  onErrorConfirm = () => {
    this.setState({
      error: null,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Navigation title="Booking" onBack={this.props.history.goBack} />
        <DesktopError
          onErrorConfirm={this.onErrorConfirm}
          errors={this.state.error}
        />
        {this.state.isLoading && <Loader />}
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <Grid container>
              <CustomRow padding="2.5rem 0 0 0">
                <Header as="h4">
                  <FormattedMessage id="booking.angel.decline.reasonTitle" />
                </Header>
              </CustomRow>
              <CustomRow padding="1rem 0 0 0">
                <Paragraph light fontSize="0.9375rem">
                  <FormattedMessage id="booking.angel.decline.reasonExplanation" />
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
        <Confirmation style={{ bottom: '-3rem' }}>
          <ConfirmationSection
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
            selectedReason={this.state.selectedReason.length > 0}
          />
        </Confirmation>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  {
    onBookingCancel,
  }
)(AngelBookingDecline);
