import React from 'react';
import styled from 'styled-components';
import BasicButton from 'Components/Buttons/Basic';
import TextButton from 'Components/Buttons/Text';
import { injectIntl } from 'react-intl';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;

  & button:first-child {
    flex: 0.8;
  }
  & button:last-child {
    flex: 1;
  }
`;

const ActionButtons = ({ onCancel, onBookingCancel, intl }) => (
  <Container>
    <TextButton onClick={onCancel}>
      {intl.formatMessage({
        id: 'cancel',
      })}
    </TextButton>
    <BasicButton onClick={onBookingCancel} primary>
      {intl.formatMessage({
        id: 'booking.cancel.sendButton',
      })}
    </BasicButton>
  </Container>
);

export default injectIntl(ActionButtons);
