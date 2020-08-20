import React from 'react';
import styled from 'styled-components';
import BasicButton from 'Components/Buttons/Basic';
import TextButton from 'Components/Buttons/Text';
import { FormattedMessage } from 'react-intl';

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

const ActionButtons = ({ onCancel, onCancelMembership, disabled }) => (
  <Container>
    <TextButton onClick={onCancel}>
      <FormattedMessage id="profile.family.membership.cancel.goBack" />
    </TextButton>
    <BasicButton onClick={onCancelMembership} primary disabled={disabled}>
      <FormattedMessage id="profile.family.membership.cancel.sendAndCancel" />
    </BasicButton>
  </Container>
);

export default ActionButtons;
