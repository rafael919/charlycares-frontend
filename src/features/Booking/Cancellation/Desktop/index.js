import { injectIntl, FormattedMessage } from 'react-intl';
import { Paragraph } from 'Components/Text';
import { connect } from 'react-redux';
import { onBookingCancel } from '../../data/actions';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import DesktopError from 'Components/DesktopError';
import Loader from 'Components/Loader';
import Navigation from 'Components/Navigation';
import React from 'react';

import ActionButtons from '../components/ActionButtons';
import Header from '../components/Header';
import List from '../components/List';
import Message from '../components/Message';
import Reason from '../components/Reason';
import API from '../api';

class Cancellation extends React.Component {
  state = {
    isLoading: false,
    error: null,
    message: '',
    selectedReasons: [],
  };

  onMessageChange = e => {
    this.setState({
      message: e.target.value,
    });
  };

  onBookingCancel = () => {
    if (this.props.location.state) {
      this.setState(
        {
          isLoading: true,
        },
        () => {
          API.cancelBooking(this.props.location.state.bookingId, {
            reasons: this.state.selectedReasons,
            add_reason: this.state.message,
          })
            .then(res =>
              this.setState(
                {
                  isLoading: false,
                },
                () => {
                  this.props.onBookingCancel(res.data.data);
                  this.props.history.push('/booking');
                }
              )
            )
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

  onErrorConfirm = () => {
    this.setState({ error: null });
  };

  isReasonSelected = id => {
    if (this.state.selectedReasons && this.state.selectedReasons.length) {
      return Boolean(
        this.state.selectedReasons.find(
          selectedReason => selectedReason.id === id
        )
      );
    }
  };

  onReasonSelect = reason => () => {
    const isInList = this.state.selectedReasons.find(
      selectedReason => selectedReason.id === reason.id
    );
    if (Boolean(isInList)) {
      this.setState(state => {
        return {
          selectedReasons: state.selectedReasons.filter(
            selectedReason => selectedReason.id !== reason.id
          ),
        };
      });
    } else {
      this.setState(state => ({
        selectedReasons: [...state.selectedReasons, reason],
      }));
    }
  };

  render() {
    if (!this.props.location.state) return null;

    const { bookingId, familyId, reasons } = this.props.location.state;

    return (
      <React.Fragment>
        <Navigation
          title="Booking"
          isWhite
          subTitle={
            <FormattedMessage
              id="booking.offers.details"
              values={{
                bookingId,
                familyId,
              }}
            />
          }
          onBack={this.props.history.goBack}
        />
        {this.state.isLoading ? <Loader /> : null}
        <DesktopError
          errors={this.state.error}
          onErrorConfirm={this.onErrorConfirm}
        />
        <CustomRow padding="1rem 0 0 0">
          <CustomColumn>
            <Header>
              {this.props.intl.formatMessage({
                id: 'booking.cancel.header',
              })}
            </Header>
            <Paragraph light fontSize="0.9375rem">
              {this.props.intl.formatMessage({
                id: 'booking.cancel.desc',
              })}
            </Paragraph>
            <List>
              {reasons && reasons.length
                ? reasons.map(reason => (
                    <Reason
                      key={reason.id}
                      data={reason}
                      onReasonSelect={this.onReasonSelect}
                      selected={this.isReasonSelected(reason.id)}
                    />
                  ))
                : null}
            </List>
            <Message
              message={this.state.message}
              onMessageChange={this.onMessageChange}
            />
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          <ActionButtons
            onCancel={this.props.history.goBack}
            onBookingCancel={this.onBookingCancel}
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
)(injectIntl(Cancellation));
