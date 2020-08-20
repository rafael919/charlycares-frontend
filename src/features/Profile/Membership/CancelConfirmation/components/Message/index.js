import styled from 'styled-components';
import React from 'react';
import Label from 'Components/Label';
import { FormattedMessage } from 'react-intl';

const Textarea = styled.textarea`
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.defaultBtnBackgroundColor};
  max-width: 100%;
  display: block;
  margin-bottom: 5rem;
  font-family: ${({ theme }) => theme.secondaryFont};
  height: 3rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Message = ({ message, onMessageChange, intl }) => (
  <Container>
    <Label>
      <FormattedMessage id="profile.family.membership.cancel.optionalMessage" />
    </Label>
    <Textarea value={message} onChange={onMessageChange} rows="7" />
  </Container>
);

export default Message;
