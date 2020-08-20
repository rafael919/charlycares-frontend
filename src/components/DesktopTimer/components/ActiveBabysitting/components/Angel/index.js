import { isMobile } from 'react-device-detect';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';
import DefaultAngelImage from 'Components/DefaultAngelImage';

import chatIcon from 'Assets/icons/btn-chat.svg';
import phoneIcon from 'Assets/icons/btn-phone.svg';
import phoneIconDisabled from 'Assets/icons/btn-phone-disabled.svg';
import chatIconDisabled from 'Assets/icons/btn-chat-disabled.svg';
import btnCalendar from 'Assets/icons/btn-calendar.svg';
import btnCalendarDisabled from 'Assets/icons/btn-calendar-disabled.svg';
import Indicator from 'Components/Indicator';

const SectionWrapper = styled.li`
  display: flex;
  padding: 0.90625rem 1rem;
  width: 100%;
  position: relative;
  background-color: #fff;
  margin-right: ${({ role }) => (role === 'angel' ? '5rem' : '1rem')};
`;

const SectionWrapperAsDiv = SectionWrapper.extend`
  padding: 0;
`.withComponent('div');

const CustomImage = DefaultAngelImage.extend`
  width: ${({ role }) => (role === 'angel' ? '7.5625rem' : '5.0625rem')};
  border-radius: 5px;
  height: 5.0625rem;
  margin-right: 2.2%;
`;

const Image = styled.img``;

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
  role,
  newMessage,
  togglePhoneModal,
}) => {
  const angelData = { img, name, phone };
  return div ? (
    <SectionWrapperAsDiv role={role}>
      <CustomImage role={role} src={img} onClick={onAngelSelect} />
      <div>
        <AngelName>
          {name} ({age})
        </AngelName>
        <Buttons>
          <Button
            onClick={
              userId &&
              onNavigate(history, `/favorites/chat/${userId}`, angelData)
            }
          >
            <Image src={id ? chatIcon : chatIconDisabled} />
            <ButtonText enabled={id}>
              <FormattedMessage id="booking.accepted.message" />
            </ButtonText>
            {newMessage > 0 && <Indicator messageCount={newMessage} />}
          </Button>

          <CallButton
            href={isMobile && phone ? `tel:${phone}` : null}
            onClick={togglePhoneModal}
          >
            <Image src={phoneIcon} />
            <ButtonText enabled={true}>
              <FormattedMessage id="booking.accepted.call" />
            </ButtonText>
          </CallButton>
          {role === 'family' ? (
            <Button
              onClick={
                id && onNavigate(history, `/favorites/availability/${id}`)
              }
            >
              <Image src={id ? btnCalendar : btnCalendarDisabled} />
              <ButtonText enabled={id}>
                <FormattedMessage id="booking.accepted.calendar" />
              </ButtonText>
            </Button>
          ) : null}
        </Buttons>
      </div>
    </SectionWrapperAsDiv>
  ) : (
    <SectionWrapper>
      <CustomImage src={img} onClick={onAngelSelect} />
      <div>
        <AngelName>
          {name} ({age})
        </AngelName>
        <Buttons>
          <Button
            onClick={
              isMobile
                ? userId && onNavigate(history, `/chat/${userId}`, angelData)
                : userId &&
                  onNavigate(history, `/favorites/chat/${userId}`, angelData)
            }
          >
            <Image src={id ? chatIcon : chatIconDisabled} />
            <ButtonText enabled={id}>
              <FormattedMessage id="booking.accepted.message" />
            </ButtonText>
          </Button>

          <CallButton href={phone && `tel:${phone}`}>
            <Image src={phone ? phoneIcon : phoneIconDisabled} />
            <ButtonText enabled={phone ? true : false}>
              <FormattedMessage id="booking.accepted.call" />
            </ButtonText>
          </CallButton>

          <Button
            onClick={id && onNavigate(history, `/calendar/bookings/${id}`)}
          >
            <Image src={id ? btnCalendar : btnCalendarDisabled} />
            <ButtonText enabled={id}>
              <FormattedMessage id="booking.accepted.calendar" />
            </ButtonText>
          </Button>
        </Buttons>
      </div>
    </SectionWrapper>
  );
};

export default AngelSection;
