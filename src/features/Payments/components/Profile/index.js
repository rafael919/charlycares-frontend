import { FormattedMessage } from 'react-intl';
import { Image } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';

import arrowRight from 'Assets/icons/btn-large-arrow-right.svg';
import btnCalendar from 'Assets/icons/btn-calendar.svg';
import btnCalendarDisabled from 'Assets/icons/btn-calendar-disabled.svg';
import chatIcon from 'Assets/icons/btn-chat.svg';
import chatIconDisabled from 'Assets/icons/btn-chat-disabled.svg';
import phoneIcon from 'Assets/icons/btn-phone.svg';
import phoneIconDisabled from 'Assets/icons/btn-phone-disabled.svg';

const SectionWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #e6e6e6;
  padding: 0.90625rem 0;
  width: 100%;
  position: relative;
`;

const CustomImage = styled.img`
  width: ${({ role }) => (role === 'family' ? '5.0625rem' : '7.5625rem')};
  height: ${({ role }) => (role === 'angel' ? '7.5625rem' : '5.0625rem')};
  border-radius: ${({ role }) => (role === 'family' ? '50%' : '0.25rem')};
  border: 1px solid ${props => props.theme.defaultGrey};
  margin-right: ${({ role }) => role === 'angel' && '0.625rem'};
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: -0.2rem;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1.5rem;
  padding: 0.37125rem 0;
  border: 0;
  background: transparent;
  font-family: ${props => props.theme.secondaryFont};

  &:hover {
    cursor: pointer;
  }
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
  margin: 0;
  margin-top: 0.5rem !important;
`;

const ArrowBtn = styled.button`
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  height: 100%;
  width: 1.25rem;
  display: flex;
  justify-content: flex-end;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: 0;
  }
`;
const Arrow = styled.img``;

const onNavigate = (history, to, state, closeModal) => () => {
  if(closeModal) {
    closeModal(); 
  }
  
  if (state) {
    return history.push(to, state);
  }
  return history.push(to);
};

const Profile = ({
  id,
  phone,
  bookingEnabled,
  history,
  name,
  age,
  img,
  role,
  closeModal,
  userId,
  togglePhoneModal,
}) => {
  return (
    <SectionWrapper>
      <CustomImage role={role} src={img} />
      <div style = {{marginLeft : 10}}>
        <AngelName>
          {name} {age && `(${age})`}
        </AngelName>
        <Buttons>
          <Button
            onClick={
              isMobile
                ? id && onNavigate(history, '/chat/' + userId, { img, name, phone })
                : id &&
                  onNavigate(history, '/payments/chat/' + userId, {
                    img,
                    name,
                    phone,
                  }, closeModal)
            }
          >
            <Image src={id ? chatIcon : chatIconDisabled} />
            <ButtonText enabled={id}>
              <FormattedMessage id="message" />
            </ButtonText>
          </Button>

          <CallButton href={isMobile ? `tel:+${phone}` : null} onClick={togglePhoneModal}>
            <Image src={phone ? phoneIcon : phoneIconDisabled}/>
            <ButtonText enabled>
              <FormattedMessage id="call" />
            </ButtonText>
          </CallButton>

          {role === 'family' && (
            <Button
              onClick={
                isMobile
                  ? id && onNavigate(history, '/calendar/availability/' + id)
                  : id &&
                    onNavigate(history, '/favorites/availability/' + id, {}, closeModal)
              }
            >
              <Image src={id ? btnCalendar : btnCalendarDisabled} />
              <ButtonText enabled={id}>
                <FormattedMessage id="booking" />
              </ButtonText>
            </Button>
          )}
        </Buttons>
      </div>
      <ArrowBtn
        onClick={
          role === 'family'
            ? isMobile
              ? onNavigate(history, '/angel/' + id, { from: 'payments' })
              : onNavigate(history, '/favorites/angel/' + id, {
                  from: 'payments',
                }, closeModal)
            : isMobile
            ? onNavigate(history, '/families/' + id)
            : onNavigate(history, '/payments/families/' + id)
        }
      >
        <Arrow src={arrowRight} />
      </ArrowBtn>
    </SectionWrapper>
  );
};

export default Profile;
