import React from 'react';
import { injectIntl } from 'react-intl';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import SendBtn from '../SendBtn';

function onEnterSubmit(newMessage, onMessageSend) {
  return function(e) {
    if (e.key === 'Enter' && newMessage.length > 0) {
      onMessageSend();
    }
  };
}

const SendMessageSection = ({
  intl,
  newMessage,
  onInputTextChanged,
  onSend,
  image,
  messages,
}) => {
  return (
    <Container>
      <Input
        value={newMessage}
        onChange={onInputTextChanged}
        placeholder={intl.formatMessage({
          id: 'chat.message',
        })}
        onKeyDown={onEnterSubmit(newMessage, onSend)}
      />
      {image && (
        <SendDiv>
          <SendBtn messages={messages} onSend={onSend} />
        </SendDiv>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  width: ${isMobile ? `calc(100% + 2.1rem)` : `100%`};
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-top: 1px solid ${props => props.theme.grey};
  margin-bottom: -0.1rem;
  margin-left: -1rem;
`;

const SendDiv = styled.div`
  padding-left: 5px;
`;

const Input = styled.input`
  border: 0px solid #000;
  background-color: white;
  width: 100%;
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

export default injectIntl(SendMessageSection);
