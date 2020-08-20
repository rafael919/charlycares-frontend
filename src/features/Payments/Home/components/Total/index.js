import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const sumPayments = payments => {
  return payments
    .reduce((acc, curr) => acc + Number(curr.total_amount), 0)
    .toFixed(2);
};

const Total = ({ chargeBackPayments = [], paymentLink }) => {
  return (
    <Container>
      <InnerContainer>
        <TotalDesc>
          <FormattedMessage id="payments.family.home.total" />
        </TotalDesc>
        <TotalSum>€ {sumPayments(chargeBackPayments)}</TotalSum>
      </InnerContainer>
      <ButtonContainer>
        <BasicButton href={paymentLink}>
          <FormattedMessage id="payments.family.home.payNowBtn" />
        </BasicButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 0.75rem 1rem 1.3125rem;

  &:focus {
    outline: 0;
  }
`;
const InnerContainer = styled.div`
  flex: 1;
`;
const ButtonContainer = InnerContainer.extend`
  text-align: right;
  padding-left: 1rem;
`;

const TotalDesc = styled.div`
  font-size: 0.8125rem;
  color: ${props => props.theme.lightGrey};
  text-align: center;
`;
const TotalSum = styled.div`
  font-size: 1.5rem;
  color: ${props => props.theme.warning};
  text-align: center;
`;

const BasicButton = styled.a`
  background: ${props => props.theme.primaryColor};
  cursor: pointer;
  display: inline-block;
  min-height: 1em;
  outline: 0;
  border: none;
  vertical-align: baseline;
  color: #fff;
  font-family: ${props => props.theme.secondaryFont};
  margin: 0 0.25em 0 0;
  padding: 0.6875em 1.5em 0.6875em;
  text-transform: none;
  text-shadow: none;
  font-weight: 600;
  line-height: 1em;
  font-style: normal;
  text-align: center;
  text-decoration: none;
  border-radius: 1.85714rem;
  width: 100%;
`;

export default Total;
