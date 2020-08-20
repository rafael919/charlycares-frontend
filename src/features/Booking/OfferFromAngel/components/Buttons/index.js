import React from 'react';
import styled from 'styled-components';
import BasicButton from 'Components/Buttons/Basic';
import { FormattedMessage } from 'react-intl';

const Container = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeclineButton = styled.button`
  font-family: ${props => props.theme.primaryFont};
  color: ${props => props.theme.secondaryColor};
  padding: 0.4rem 0.5rem 0.2rem;
  border: 0;
  background: transparent;

  &:focus {
    outline: 0;
  }
`;

const Buttons = ({ onAccept, onDecline }) => {
  return (
    <Container>
      <ButtonWrapper>
        <DeclineButton onClick={onDecline}>
          <FormattedMessage id="booking.angelOffer.btnDecline" />
        </DeclineButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <BasicButton onClick={onAccept} primary fluid>
          <FormattedMessage id="booking.angelOffer.btnAccept" />
        </BasicButton>
      </ButtonWrapper>
    </Container>
  );
};

export default Buttons;
