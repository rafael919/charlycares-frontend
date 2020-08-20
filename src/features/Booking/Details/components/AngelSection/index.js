import { Image } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';

import chatIcon from 'Assets/icons/btn-chat.svg';
import phoneIcon from 'Assets/icons/btn-phone.svg';
import phoneIconDisabled from 'Assets/icons/btn-phone-disabled.svg';
import chatIconDisabled from 'Assets/icons/btn-chat-disabled.svg';
import btnCalendar from 'Assets/icons/btn-calendar.svg';
import btnCalendarDisabled from 'Assets/icons/btn-calendar-disabled.svg';
import arrowRight from 'Assets/icons/btn-large-arrow-right.svg';
import placeholder from 'Assets/images/profile-placeholder.png';

const SectionWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #e6e6e6;
  padding: 0.90625rem 0;
  width: 100%;
  position: relative;
`;

const CustomImage = styled.img`
  width: 81px;
  height: 81px;
  border: 1px solid ${props => props.theme.defaultGrey};
  border-radius: 50%;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const Button = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1.5rem;
`;

const CallButton = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1.5rem;
`;

const ButtonText = styled.div`
  color: ${props => (props.enabled ? props.theme.accentText : '#C7C7C9')};
  font-size: 0.75rem;
`;

const AngelName = styled.h5`
  margin-bottom: 0.5rem;
`;

const ArrowBtn = styled.button`
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: 0;
  padding: 0;
  width: 20vw;
  height: 100%;
  text-align: right;

  &:focus {
    outline: 0;
  }
`;

const ArrowImg = styled.img``;

const onNavigate = (history, to, state) => () => {
  history.push(to, state);
};

const AngelSection = ({ angelId, phone, history, name, age, img }) => {
  const angelData = {
    img,
    name,
    phone,
  };
  return (
    <SectionWrapper>
      <CustomImage src={img ? img : placeholder} />
      <div>
        <AngelName>
          {name} ({age})
        </AngelName>
        <Buttons>
          <Button
            onClick={
              angelId && onNavigate(history, '/chat/' + angelId, angelData)
            }
          >
            <Image src={angelId ? chatIcon : chatIconDisabled} />
            <ButtonText enabled={angelId}>
              <FormattedMessage id="message" />
            </ButtonText>
          </Button>
          <CallButton href={`tel:+${phone}`}>
            <Image src={phone ? phoneIcon : phoneIconDisabled} />
            <ButtonText enabled>
              <FormattedMessage id="call" />
            </ButtonText>
          </CallButton>
          <Button
            onClick={
              angelId &&
              onNavigate(history, '/calendar/availability/' + angelId)
            }
          >
            <Image src={angelId ? btnCalendar : btnCalendarDisabled} />
            <ButtonText enabled={angelId}>
              <FormattedMessage id="calendar" />
            </ButtonText>
          </Button>
        </Buttons>
      </div>
      <ArrowBtn onClick={onNavigate(history, '/angel/' + angelId)}>
        <ArrowImg src={arrowRight} />
      </ArrowBtn>
    </SectionWrapper>
  );
};

export default AngelSection;
