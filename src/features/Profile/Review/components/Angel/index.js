import { FormattedMessage } from 'react-intl';
import { Image } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import DefaultAngelImage from 'Components/DefaultAngelImage';
import Indicator from 'Components/Indicator';
import React from 'react';
import styled from 'styled-components';

import arrowRight from 'Assets/icons/btn-large-arrow-right.svg';
import btnCalendar from 'Assets/icons/btn-calendar.svg';
import btnCalendarDisabled from 'Assets/icons/btn-calendar-disabled.svg';
import chatIcon from 'Assets/icons/btn-chat.svg';
import chatIconDisabled from 'Assets/icons/btn-chat-disabled.svg';
import phoneIcon from 'Assets/icons/btn-phone.svg';
import phoneIconDisabled from 'Assets/icons/btn-phone-disabled.svg';
import placeholder from 'Assets/images/profile-placeholder.png';

const SectionWrapper = styled.li`
  display: flex;
  padding: 0.90625rem 1rem;
  width: 100%;
  position: relative;
  background-color: #fff;
`;

const SectionWrapperAsDiv = SectionWrapper.extend`
  padding: ${isMobile ? '0.9375rem 1rem' : '0.9375rem 0'};
`.withComponent('div');

const CustomImage = DefaultAngelImage.extend`
  width: 81px;
  height: 81px;
  margin-right: 2.2%;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1.5rem;
  max-height: 3.125rem;
  cursor: pointer;
  background: transparent;
  border: 0;
  position: relative;
  &:focus {
    outline: 0;
  }
`;

const CallButton = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 3rem;
  margin-right: 1.5rem;
`;

const ButtonText = styled.div`
  color: ${props => (props.enabled ? props.theme.accentText : '#C7C7C9')};
  font-size: 0.75rem;
`;

const AngelName = styled.h5`
  margin-top: 0.55rem !important;
  margin-bottom: 0;
`;

const ArrowBtn = styled.button`
  border: 0;
  background: transparent;
  position: absolute;
  right: 0;
  top: 0;
  width: 5.25rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

const onNavigate = (history, to, state) => () => {
  history.push(to, state);
};

const AngelSection = ({
  phone,
  bookingEnabled,
  history,
  name,
  age,
  img,
  div,
  id,
  onAngelSelect,
  userId,
  wasBooked,
  newMessage,
  togglePhoneModal,
}) => {
  const angelData = { img, name, phone, wasBooked };
  return (
    <SectionWrapperAsDiv>
      <CustomImage src={img ? img : placeholder} onClick={onAngelSelect} />
      <div>
        <AngelName>
          {name} ({age})
        </AngelName>
        <Buttons>
          <Button
            onClick={
              userId && wasBooked
                ? onNavigate(history, `/chat/${userId}`, angelData)
                : null
            }
          >
            <Image src={wasBooked ? chatIcon : chatIconDisabled} />
            <ButtonText enabled={id}>
              <FormattedMessage id="chat" />
            </ButtonText>
            {newMessage > 0 && <Indicator messageCount={newMessage} />}
          </Button>

          <CallButton
            href={isMobile && phone ? `tel:${phone}` : null}
            onClick={wasBooked ? togglePhoneModal : null}
          >
            <Image src={phone && wasBooked ? phoneIcon : phoneIconDisabled} />
            <ButtonText enabled={phone ? true : false}>
              <FormattedMessage id="call" />
            </ButtonText>
          </CallButton>
          <Button
            onClick={
              isMobile && id
                ? onNavigate(history, `/calendar/bookings/${id}`)
                : id
                ? onNavigate(history, `/favorites/availability/${id}`)
                : null
            }
          >
            <Image src={id ? btnCalendar : btnCalendarDisabled} />
            <ButtonText enabled={id}>
              <FormattedMessage id="calendar" />
            </ButtonText>
          </Button>
        </Buttons>
      </div>
      <ArrowBtn onClick={onAngelSelect}>
        <Image src={arrowRight} />
      </ArrowBtn>
    </SectionWrapperAsDiv>
  );
};

export default AngelSection;
