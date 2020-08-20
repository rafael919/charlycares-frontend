import { FormattedMessage } from 'react-intl';
import { Image } from 'semantic-ui-react';
import React from 'react';
import styled from 'styled-components';

import clockIcon from 'Assets/icons/icn-time.svg';

const ExpirationTimeContainer = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  text-align: right;
  color: ${props => props.theme.lightGrey};
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Time = styled.span`
  font-weight: 600;
  margin-left: 0.375rem;
`;


const ExpirationTime = ({ expired, awaiting, declined, declinedFamily, canceled, timeRemaining }) => {
  return expired ? (
    <ExpirationTimeContainer>
      <FormattedMessage id="booking.offers.expired" />
    </ExpirationTimeContainer>
  ) : awaiting ? (
    <ExpirationTimeContainer>
      <FormattedMessage id="booking.offers.awaiting" />
    </ExpirationTimeContainer>
  ) : declined ? (
    <ExpirationTimeContainer>
      <FormattedMessage id="booking.offers.declined" />
    </ExpirationTimeContainer>
  ) : declinedFamily ? (
    <ExpirationTimeContainer>
      <FormattedMessage id="booking.offers.declinedFamily" />
    </ExpirationTimeContainer>
  ) : canceled ? (
    <ExpirationTimeContainer>
      <FormattedMessage id="booking.offers.canceled" />
    </ExpirationTimeContainer>
  ) : (
    timeRemaining && (
      <ExpirationTimeContainer>
        <Image avatar src={clockIcon} />{' '}
        <FormattedMessage id="booking.offers.expiresIn" />{' '}
        <Time>{timeRemaining}</Time>
      </ExpirationTimeContainer>
    )
  );
};

export default ExpirationTime;
