import { FormattedMessage } from 'react-intl';
import { Image } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import BasicButton from 'Components/Buttons/Basic';
import React from 'react';
import styled from 'styled-components';

import calendarIcon from 'Assets/icons/btn-calendar.svg';

const navigateToCalendar = history => () => {
  isMobile
    ? history.push('/calendar')
    : history.push('/booking/angel-booking/calendar');
};

const ConfirmationSection = ({
  onAccept,
  onDecline,
  history,
  total,
  numOfAccepted,
}) => {
  return (
    <Container>
      <CalendarContainer>
        <CalendarButton onClick={navigateToCalendar(history)}>
          <CalendarIcon src={calendarIcon} />
          <FormattedMessage id="booking.angel.offers.details.show" />
        </CalendarButton>
      </CalendarContainer>

      <ButtonsContainer>
        <DeclineButtonContainer onClick={onDecline}>
          <DeclineButton>
            <FormattedMessage id="booking.angel.offers.details.decline" />
          </DeclineButton>
        </DeclineButtonContainer>
        <AcceptButtonContainer>
          <BasicButton onClick={onAccept} fluid primary>
            {total > 1 ? 
              <FormattedMessage
                id="booking.angel.offers.details.accept"
                values={{ total: total, selected: numOfAccepted }}
              /> : 
              <FormattedMessage
                id="booking.angel.offers.details.acceptBtn"
                values={{ total: total, selected: numOfAccepted }}
              />
            }
            
          </BasicButton>
        </AcceptButtonContainer>
      </ButtonsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const CalendarIcon = styled(Image)`
  &&& {
    width: 1.5625rem;
    height: 1.5625rem;
  }
`;

const CalendarButton = styled.button`
  background: transparent;
  border: 0;
  font-size: 0.625rem;
  color: ${props => props.theme.secondaryColor};
  padding-right: 1.25rem;
  padding-left: 0.25rem;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #c7c7c9;
`;

const DeclineButton = styled.button`
  font-family: ${props => props.theme.primaryFont};
  color: ${props => props.theme.secondaryColor};
  background: transparent;
  border: 0;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

const AcceptButtonContainer = styled.div`
  flex: 1.1;
`;
const DeclineButtonContainer = styled.div`
  flex: 1;
`;

export default ConfirmationSection;
