import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const SendBtn = ({ messages, onSend }) => {
  return (
    <Container messages={messages} onClick={messages ? onSend : null}>
      <Text messages={messages}><FormattedMessage id="chat.sendBtn" /></Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 4.1rem;
  height: 1.8rem;
  border-radius: 5px;
  border: 1.2px solid
    ${props => (props.messages ? '#68AEBF' : props.theme.grey)};
  justify-content: center;
  align-items: center;
  ${props => props.messages && `background-color: #68AEBF;`}
  cursor: pointer;
`;

const Text = styled.span`
  font-size: 0.9rem;
  line-height: 1.6;
  color: ${props => (props.messages ? '#FFFFFF' : props.theme.grey)};
`;

export default SendBtn;
