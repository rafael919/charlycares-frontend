import { FormattedMessage } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import moment from 'moment';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import Loader from 'Components/Loader';
import Error from 'Components/Error';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import API from '../api';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import ListItem from './components/ListItem';
import StyledList from './components/List';
import Buttons from './components/Buttons';

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

  sumAccepted = () => {
    const { state } = this.props.location;
    return state.bookingDateResponses.reduce((acc, curr) => {
      if (curr.current_state === 'accepted') return acc + 1;
      return acc + 0;
    }, 0);
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
      const { startDate, endDate, repeatQty } = state;
      const mStartDate = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
      const mEndDate = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
      return (
        <Layout
          navBorder
          onNavBack={this.props.history.goBack}
          navRightComponent={() => (
            <CustomLink primary to="/booking">
              <FormattedMessage id="navigation.support" />
            </CustomLink>
          )}
          navTitle={mStartDate.clone().format('dddd')}
          navSubTitle={`${mStartDate
            .clone()
            .format('HH:mm')} - ${mEndDate.clone().format('HH:mm')}`}
          centered
        >
          {this.state.isLoading && <Loader />}
          <Error
            errors={this.state.errors}
            onErrorConfirm={this.onErrorConfirm}
          />
          <CustomRow noPadding>
            <CustomColumn noPadding>
              <Divider />
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
                          selected: this.sumAccepted(),
                          max: repeatQty,
                        }}
                      />
                    </InlineText>
                  </CustomColumn>
                </CustomRow>
                <CustomRow padding="0 0 10rem 0">
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
                </CustomRow>
              </Grid>
            </CustomColumn>
          </CustomRow>
          <Confirmation>
            <Buttons
              onAccept={this.onOfferAccept}
              onDecline={this.onDeclineOffer}
            />
          </Confirmation>
        </Layout>
      );
    }
    return null;
  }
}

export default OfferFromAngel;
