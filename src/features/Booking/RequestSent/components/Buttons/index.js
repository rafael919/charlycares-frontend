import BasicButton from 'Components/Buttons/Basic';
import React from 'react';
import styled from 'styled-components';

const ShareButtonsHeading = styled.div`
  font-size: 0.9375rem;
  margin-bottom: 1rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  & > a:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const Buttons = () => {
  return (
    <div>
      <ShareButtonsHeading>Share with your friends</ShareButtonsHeading>
      <ButtonsContainer>
        <BasicButton as="a" primary href="whatsapp">
          WhatsApp
        </BasicButton>
        <BasicButton as="a" primary href="sms">
          SMS
        </BasicButton>
        <BasicButton as="a" primary href="email">
          E-mail
        </BasicButton>
      </ButtonsContainer>
    </div>
  );
};

export default Buttons;
