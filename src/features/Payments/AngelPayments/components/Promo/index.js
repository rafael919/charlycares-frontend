import { injectIntl } from 'react-intl';
import React from 'react';
import styled from 'styled-components';

import presentIcon from 'Assets/icons/icn-present.svg';

const PromoContainer = ({ credit = 0, intl, goToPromo }) => {
  return (
    <Container>
      <HeadingWrapper>
        <Heading>
          {intl.formatMessage({
            id: 'payments.angel.promo.title',
          })}
        </Heading>
        <Credit>
          {intl.formatNumber(credit, {
            style: 'currency',
            currency: 'EUR',
          })}
        </Credit>
      </HeadingWrapper>
      <DescContainer>
        <IconContainer>
          <Icon src={presentIcon} />
        </IconContainer>
        <Desc>
          {intl.formatMessage({
            id: 'payments.angel.promo.desc',
          })}
        </Desc>
        <Button onClick={goToPromo}>
          {intl.formatMessage({
            id: 'payments.angel.promo.button',
          })}
        </Button>
      </DescContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.25rem 1rem 0.75rem;
  background: ${({ theme }) => theme.lightGreen};
`;
const Heading = styled.div`
  font-size: 1.1875rem;
  font-weight: 400;
  font-family: ${({ theme }) => theme.secondaryFont};
`;

const HeadingWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.75rem;
`;

const Credit = styled.div`
  font-size: 1.5rem;
  font-weight: 300;
  font-family: ${({ theme }) => theme.secondaryFont};
`;

const DescContainer = styled.div`
  display: flex;
  align-items: flex-start;
  align-items: center;
`;

const Icon = styled.img`
  width: 38px;
  height: 38px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-right: 0.5rem;
  align-self: flex-start;
`;

const Desc = styled.p`
  font-size: 0.9375rem;
  font-weight: 300;
  margin: 0;
`;

const Button = styled.button`
  font-size: 0.8125rem;
  font-weight: 600;
  color: #fff;
  font-family: ${({ theme }) => theme.secondaryFont};
  background: ${({ theme }) => theme.primaryColor};
  border-radius: 1.8125rem;
  border: 0;
  padding: 0.25rem 0.75rem;
`;

export default injectIntl(PromoContainer);
