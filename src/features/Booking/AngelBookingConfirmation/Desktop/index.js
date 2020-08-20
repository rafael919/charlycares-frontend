import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import DesktopError from 'Components/DesktopError';
import Loader from 'Components/Loader';
import Navigation from 'Components/Navigation';
import React, { Component } from 'react';

import { onBookingEdit } from '../../data/actions';
import ConfirmationSection from '../components/ConfirmationSection';
import Day from '../components/Day';
import DaysList from '../components/DaysList';
import API from '../../data/api';

class AngelBookingConfirmation extends Component {
  state = {
    isLoading: false,
    error: null,
  };

  onConfirm = () => {
    const { id, payload } = this.props.location.state;

    this.props.onAngelAcceptBooking(id, payload, this.props.history);
    this.props.onBookingEdit(id);
  };

  onAngelAccept = () => {
    const { id, payload } = this.props.location.state;
    this.setState(
      {
        isLoading: true,
      },
      () => {
        API.angelAcceptBooking(id, payload)
          .then(res => {
            this.setState({ isLoading: false }, () => {
              this.props.onBookingEdit(res.data.data);
              this.props.history.push(
                '/booking/angel-booking/' + res.data.data.accepted_invitation.id
              );
            });
          })
          .catch(err => {
            this.setState({
              isLoading: false,
              error: err,
            });
          });
      }
    );
  };

  onErrorConfirm = () => {
    this.setState({ error: null });
  };

  render() {
    return (
      <React.Fragment>
        <Navigation
          title={<FormattedMessage id="booking.family.confirmation.title" />}
          subTitle={
            <FormattedMessage
              id="booking.angel.offers.details.subTitle"
              values={{
                angelId: this.props.location.state.angelId,
                bookingId: this.props.location.state.bookingId,
              }}
            />
          }
          onBack={this.props.history.goBack}
        />
        <DesktopError
          errors={this.state.error}
          onErrorConfirm={this.onErrorConfirm}
        />
        {this.state.isLoading ? <Loader /> : null}
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Grid container>
              <CustomRow padding="2.5rem 0 0 0">
                <Header as="h3">
                  <FormattedMessage id="booking.family.confirmation.heading" />
                </Header>
              </CustomRow>
              <CustomRow padding="0 0 1rem 0">
                <Paragraph light fontSize="0.9375rem">
                  <FormattedMessage
                    id="booking.family.confirmation.text"
                    values={{ family: this.props.location.state.familyName }}
                  />
                </Paragraph>
              </CustomRow>
              <CustomRow>
                <DaysList>
                  {this.props.location.state &&
                  this.props.location.state.days.length
                    ? this.props.location.state.days.map((day, i) => {
                        return (
                          <Day
                            totalDays={
                              this.props.location.state.days[i].bookingdates
                            }
                            selectedDays={
                              this.props.location.state.selectedDays[i]
                            }
                            key={day.id}
                            day={day}
                          />
                        );
                      })
                    : null}
                </DaysList>
              </CustomRow>
            </Grid>
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          <ConfirmationSection
            onConfirm={this.onAngelAccept}
            onCancel={this.props.history.goBack}
          />
        </Confirmation>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  {
    onBookingEdit,
  }
)(AngelBookingConfirmation);
