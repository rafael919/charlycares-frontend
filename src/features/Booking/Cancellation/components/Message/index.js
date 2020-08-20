import styled from 'styled-components';
import React from 'react';
import Label from 'Components/Label';
import { injectIntl } from 'react-intl';

const Textarea = styled.textarea`
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.defaultBtnBackgroundColor};
  max-width: 100%;
  display: block;
  margin-bottom: 5rem;
  font-family: ${({ theme }) => theme.secondaryFont};
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Message = ({ message, onMessageChange, intl }) => (
  <Container>
    <Label>
      {intl.formatMessage({ id: 'booking.cancel.optionalMessage' })}
    </Label>
    <Textarea value={message} onChange={onMessageChange} rows="7" />
  </Container>
);

export default injectIntl(Message);
