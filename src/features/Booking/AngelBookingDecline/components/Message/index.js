import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const Message = ({ value, onMessageChange }) => {
  return (
    <Container>
      <Label htmlFor="message">
        <FormattedMessage id="angel.booking.decline.messageDesc" />
      </Label>
      <Input
        onChange={onMessageChange}
        value={value}
        id="message"
        name="message"
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 300;
  color: ${props => props.theme.lightGrey};
`;

const Input = styled.input`
  display: block;
  font-size: 1.1rem;
  padding: 0.4rem;
  width: 100%;
  border: 0;
  border-bottom: 1px solid #e6e6e6;
  caret-color: #000;

  &:focus {
    outline: 0;
    caret-color: ${props => props.theme.primaryColor};
  }
`;

export default Message;
