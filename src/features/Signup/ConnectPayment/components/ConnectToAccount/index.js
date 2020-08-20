import React from 'react';
import styled from 'styled-components';
import visa from 'Assets/images/visa.png';
import adyen from 'Assets/images/adyen.png';
import BasicButton from 'Components/Buttons/Basic';
import { FormattedMessage } from 'react-intl';

const Container = styled.div`
  padding: 1.25rem;
`;

const Heading = styled.h2`
  font-size: 1rem;
`;

const Desc = styled.p`
  font-weight: 300;
  font-size: 0.9375rem;
`;
const AdyenDesc = styled.p`
  font-weight: 400;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.gray};
  margin-bottom: 1.25rem;
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const AdyenImg = styled.img`
  height: 2.5rem;
`;

const VisaImg = styled.img`
  height: 1.875rem;
`;

const ConnectToAccount = ({ link }) => {
  return (
    <Container>
      <Heading><FormattedMessage id="family.signup.connectAccountTitle" /></Heading>
      <Desc>
        <FormattedMessage id="family.signup.connectAccountDesc" />
      </Desc>
      <ImagesContainer>
        <AdyenImg src={adyen} />
        <VisaImg src={visa} />
      </ImagesContainer>
      <AdyenDesc>
        <FormattedMessage id="family.signup.connectAccountAdyenDesc" />
      </AdyenDesc>
      <BasicButton as="a" href={link} primary fluid>
        <FormattedMessage id="family.signup.connectAccountContinue" />
      </BasicButton>
    </Container>
  );
};

export default ConnectToAccount;
