import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomDivider from 'Components/Divider';
import CustomRow from 'Components/CustomRow';
import DesktopError from 'Components/DesktopError';
import Loader from 'Components/Loader';
import moment from 'moment';
import Navigation from 'Components/Navigation';
import React, { Component, Fragment } from 'react';

import { onBookingEdit, onBookingCancel } from '../../data/actions';
import API from '../../api';
import Buttons from '../components/Buttons';
import ListItem from '../components/ListItem';
import StyledList from '../components/List';

class OfferFromAngel extends Component {
  state = {
    isLoading: false,
    errors: null,
  };

  attachStates = () => {
    const { state } = this.props.location;
    return state.bookingDates.map(date => {
      const filteredDate = state.bookingDateResponses.filter(
        d => d.booking_date_id === date.id
      );

      return {
        ...date,
        current_state: filteredDate[0].current_state,
      };
    });
  };

  onOfferAccept = () => {
    this.setState(
      {
        isLoading: true,
      },
      this.acceptOffer
    );
  };

  onDeclineOffer = () => {
    this.setState(
      {
        isLoading: true,
      },
      this.declineOffer
    );
  };

  acceptOffer = () => {
    const { state } = this.props.location;
    API.onOfferAccept(state.bookingId, state.angelId)
      .then(res => {
        this.setState(
          {
            isLoading: false,
          },
          () => {
            this.props.onBookingEdit(res.data.data);
            this.props.history.push('/booking');
          }
        );
      })
      .catch(err => {
        this.setState({
          errors: err,
          isLoading: false,
        });
      });
  };

  declineOffer = () => {
    const { state } = this.props.location;
    API.onOfferDecline(state.bookingId, state.angelId)
      .then(res => {
        this.setState(
          {
            isLoading: false,
          },
          () => {
            this.props.onBookingCancel(res.data.data);
            this.props.history.push('/booking');
          }
        );
      })
      .catch(err => {
        this.setState({
          errors: err,
          isLoading: false,
        });
      });
  };

  onErrorConfirm = () => {
    this.setState({
      errors: null,
    });
  };

  render() {
    const { state } = this.props.location;
    if (state) {
      const { startDate, endDate, totalDays, selectedDays } = state;
      const mStartDate = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
      const mEndDate = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
      return (
        <Fragment>
          <Navigation
            title={mStartDate.clone().format('dddd')}
            subTitle={`${mStartDate
              .clone()
              .format('HH:mm')} - ${mEndDate.clone().format('HH:mm')}`}
            onBack={this.props.history.goBack}
          />
          {this.state.isLoading && <Loader />}
          <DesktopError
            errors={this.state.errors}
            onErrorConfirm={this.onErrorConfirm}
          />

          <CustomDivider />

          <Grid container>
            <CustomRow padding="2.5625em 0 0.9375em 0" borderBottom>
              <CustomColumn noPadding verticalAlign="bottom" width={8}>
                <Header as="h5">
                  <FormattedMessage id="booking.angelOffer.heading" />
                </Header>
              </CustomColumn>

              <CustomColumn
                noPadding
                verticalAlign="bottom"
                textAlign="right"
                width={8}
              >
                <InlineText primaryFont accentText>
                  <FormattedMessage
                    id="booking.angelOffer.repetitions"
                    values={{
                      selected: selectedDays,
                      max: totalDays,
                    }}
                  />
                </InlineText>
              </CustomColumn>
            </CustomRow>
          </Grid>

          <Segment basic vertical>
            <StyledList verticalAlign="middle">
              {this.attachStates().map((rDay, i) => {
                return (
                  <ListItem
                    checked={rDay.current_state === 'accepted'}
                    key={i}
                    date={moment(rDay.start_date).format('MMMM DD')}
                  />
                );
              })}
            </StyledList>
          </Segment>
          <Confirmation>
            <Buttons
              onAccept={this.onOfferAccept}
              onDecline={this.onDeclineOffer}
            />
          </Confirmation>
        </Fragment>
      );
    }
    return null;
  }
}

export default connect(
  null,
  { onBookingEdit, onBookingCancel }
)(OfferFromAngel);
