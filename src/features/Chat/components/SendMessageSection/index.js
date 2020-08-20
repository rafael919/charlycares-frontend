import { injectIntl } from 'react-intl';
import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';
import WithRole from 'Components/WithRole';

import addIcon from 'Assets/icons/btn-large-add-disabled.svg';
import sendIcon from 'Assets/icons/chat-send.svg';

function onEnterSubmit(newMessage, onMessageSend) {
  return function(e) {
    if (e.key === 'Enter' && newMessage.length > 0) {
      onMessageSend();
    }
  };
}

const SendMessageSection = ({
  newMessage,
  onNewMessageChange,
  onMessageSend,
  intl,
  navigateToBooking,
}) => {
  return (
    <Container>
      <Input
        value={newMessage}
        onChange={onNewMessageChange}
        placeholder={intl.formatMessage({
          id: 'chat.message',
        })}
        onKeyDown={onEnterSubmit(newMessage, onMessageSend)}
      />
      {newMessage.length !== 0 ? (
        <SendButtonContainer onClick={onMessageSend}>
          <SendIcon src={sendIcon} />
        </SendButtonContainer>
      ) : (
        <WithRole>
          {role =>
            role === 'family' ? (
              <SendButtonContainer onClick={navigateToBooking}>
                <BookIcon src={addIcon} />
                <Label>{intl.formatMessage({ id: 'chat.bookBtn' })}</Label>
              </SendButtonContainer>
            ) : null
          }
        </WithRole>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  z-index: 999999;
  padding: ${isMobile ? '0.5rem' : '0rem'};
`;

const Label = styled.div`
  font-size: 0.7rem;
  margin-top: -0.875rem;
  font-family: ${props => props.theme.secondaryFont};
`;

const Input = styled.input`
  border: 0px solid #000;
  border-radius: 30px;
  background-color: ${props => (isMobile ? 'white' : props.theme.defaultGrey)};
  width: 80%;
  display: block;
  padding: 0.46875rem 1.25rem;
  min-height: 2.3125rem;
  caret-color: #000;
  &:focus {
    outline: 0;
  }

  ::placeholder {
    color: ${props => props.theme.grey};
    font-size: 0.9375rem;
    font-family: ${props => props.theme.secondaryFont};
    font-weight: 100;
  }
`;

const SendButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${props => props.theme.secondaryColor};
  height: 2.3125rem;
  margin-right: 1rem;
  background: transparent;
  border: 0;
  height: 3rem;
  width: 4rem;

  &:focus {
    outline: 0;
  }
`;

const BookIcon = styled.img`
  width: 3.1rem;
  height: 3.1rem;
  margin-top: -0.75rem;
`;
const SendIcon = styled.img`
  width: ${isMobile ? '2.4rem' : '2.1rem'};
  height: ${isMobile ? '2.4rem' : '2.1rem'};
  margin-right: ${isMobile ? '-0.25rem;' : null};
`;

export default injectIntl(SendMessageSection);
