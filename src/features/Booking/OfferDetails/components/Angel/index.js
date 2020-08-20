import { Grid } from 'semantic-ui-react';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import CustomDivider from 'Components/Divider';
import React from 'react';

import styled from 'styled-components';
import AngelSection from '../AngelSection';
import ButtonsSection from '../ButtonsSection';
import Days from '../Days';
import warning from 'Assets/icons/warning.svg';
import ExpirationTime from '../ExpirationTime';
import placeholder from 'Assets/images/profile-placeholder.png';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { padNumber } from 'Utils';

class Angel extends React.Component {
  state = {
    timeRemaining: '00:00:00',
  };
  componentDidMount() {
    if (
      this.props.expiresAt &&
      this.props.invitationState === 'pending_approval'
    ) {
      this.calculateRemainingTime(this.props.expiresAt);
    }
  }

  calculateRemainingTime = expiresAt => {
    this.interval = setInterval(() => {
      const endTime = moment(expiresAt, 'YYYY-MM-DD HH:mm:ss');
      const now = moment();
      const totalInSec = moment.duration(endTime.diff(now)).asSeconds();
      const hours = padNumber(Math.floor(totalInSec / 3600));
      const minutes = padNumber(Math.floor((totalInSec % 3600) / 60));
      const seconds = padNumber(Math.floor((totalInSec % 3600) % 60));
      this.setState({
        timeRemaining: `${hours}:${minutes}:${seconds}`,
      });
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      angelId,
      userId,
      phone,
      history,
      name,
      age,
      divider,
      notFullyAccepted,
      invitationState,
      expired,
      awaiting,
      declined,
      declinedFamily,
      canceled,
      img,
      wasBooked,
      allowedChat,
      newMessage,
      maxDays,
      selectedDays,
      availabilityType,
      onOfferLook,
      onDeclineOffer,
      onOfferAccept,
      onRequestAgain,
      togglePhoneModal,
    } = this.props;
    return (
      <div>
        <Grid container>
          <CustomRow padding="1rem 0 0 0">
            <CustomColumn noPadding>
              <AngelSection
                declined={declined}
                name={name}
                age={age}
                img={img ? img : placeholder}
                angelId={angelId}
                userId={userId}
                phone={phone}
                history={history}
                wasBooked={wasBooked}
                allowedChat={allowedChat}
                newMessage={newMessage}
                togglePhoneModal={togglePhoneModal}
              />
            </CustomColumn>
          </CustomRow>
          {availabilityType === 'job' &&
          invitationState === 'pending_approval' ? (
            <CustomRow style={{ paddingTop: '0rem' }}>
              <NonSelectedContainer>
                <Icon src={warning} />
                <FormattedMessage id="booking.offers.offerFromJoblist" />
              </NonSelectedContainer>
            </CustomRow>
          ) : null}
          <CustomRow verticalAlign="middle" noPadding>
            <CustomColumn noPadding width={5}>
              <Days
                awaiting={awaiting}
                declined={declined}
                declinedFamily={declinedFamily}
                canceled={canceled}
                max={maxDays}
                selected={selectedDays}
              />
            </CustomColumn>
            <CustomColumn noPadding width={11}>
              <ExpirationTime
                awaiting={awaiting}
                declinedFamily={declinedFamily}
                declined={declined}
                expired={expired}
                canceled={canceled}
                timeRemaining={this.state.timeRemaining}
              />
            </CustomColumn>
          </CustomRow>
          {declined || awaiting || canceled || declinedFamily ? (
            <CustomRow />
          ) : (
            <CustomRow>
              <ButtonsSection
                onOfferLook={onOfferLook}
                expired={expired}
                madeOffer={selectedDays.length > 0}
                notFullyAccepted={notFullyAccepted}
                onDecline={onDeclineOffer}
                onAccept={onOfferAccept}
                requestAgain={onRequestAgain}
              />
            </CustomRow>
          )}
        </Grid>
        {divider && <CustomDivider desktopBorderTop desktopBorderBottom />}
      </div>
    );
  }
}

const Icon = styled.img`
  width: 1rem;
  vertical-align: sub;
  height: 1rem;
  margin-right: 0.5rem;
`;

const NonSelectedContainer = styled.div`
  background-color: rgba(223, 241, 212, 0.4);
  margin: auto;
  width: 100%;
  padding: 0.25rem;
  text-align: center;
  font-size: 0.875rem;
`;

export default Angel;
