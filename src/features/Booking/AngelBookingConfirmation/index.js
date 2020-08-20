import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import React, { Component } from 'react';

import { getErrors, getLoadingStatus } from '../../../ui/selectors';
import { onAngelAcceptBooking } from '../data/actions';
import { onErrorConfirm } from '../../../ui/actions';
import ConfirmationSection from './components/ConfirmationSection';
import Day from './components/Day';
import DaysList from './components/DaysList';

class AngelBookingConfirmation extends Component {
  onConfirm = () => {
    const { id, payload } = this.props.location.state;

    this.props.onAngelAcceptBooking(id, payload, this.props.history);
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
            onConfirm={this.onConfirm}
            onCancel={this.props.history.goBack}
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
    onAngelAcceptBooking,
    onErrorConfirm,
  }
)(AngelBookingConfirmation);
