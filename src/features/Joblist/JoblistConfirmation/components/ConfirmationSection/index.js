import React from 'react';
import styled from 'styled-components';
import BasicButton from 'Components/Buttons/Basic';
import { FormattedMessage } from 'react-intl';

const ConfirmationSection = ({ onCancel, onConfirm }) => {
  return (
    <Container>
      <CancelButtonWrapper>
        <CancelButton onClick={onCancel}><FormattedMessage id="booking.angel.confirmation.cancel" /></CancelButton>
      </CancelButtonWrapper>

      <SendAndDeclineButtonWrapper>
        <BasicButton onClick={onConfirm} fluid primary>
          <FormattedMessage id="booking.angel.confirmation.accept" />
        </BasicButton>
      </SendAndDeclineButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const CancelButton = styled.button`
  color: ${props => props.theme.secondaryColor};
  font-family: ${props => props.theme.primaryFont};
  padding: 0.5rem 0.2rem 0.2rem;
  background: transparent;
  border: 0;
`;
const CancelButtonWrapper = styled.div`
  flex: 1;
`;

const SendAndDeclineButtonWrapper = styled.div`
  flex: 1.5;
`;

export default ConfirmationSection;
