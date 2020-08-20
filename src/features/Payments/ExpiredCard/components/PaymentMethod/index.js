import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import btnEdit from 'Assets/icons/btn-edit.svg';
import creditCardIcon from 'Assets/icons/icn-feature-payment-card.svg';

const Container = styled.div`
  padding: 1.25rem;
  width: 100%;
`;

const Heading = styled.h2`
  font-size: 1rem;
`;

const sliceLastFour = accNumber => accNumber.slice(-4);

const Desc = ({ accountNumber, link }) => (
  <Container>
    <Heading>
      <FormattedMessage id="profile.family.paymentMethod" />
    </Heading>
    <MethodContainer>
      <CardContainer>
        <Icon src={creditCardIcon} />
        <div>
          <CreditCardNumber>
            <Dots>.........</Dots>
            <span>{sliceLastFour(accountNumber)}</span>
          </CreditCardNumber>
          <PaymentDesc>bank/credit</PaymentDesc>
        </div>
      </CardContainer>
      <EditButton href={link}>
        <EditIcon src={btnEdit} />
      </EditButton>
    </MethodContainer>
  </Container>
);

const MethodContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 0.5rem;
`;

const EditIcon = Icon.extend`
  margin-right: 0;
`;

const EditButton = styled.a``;


const CreditCardNumber = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-size: 1rem;
  display: inline-flex;
`;

const PaymentDesc = styled.div`
  color: ${props => props.theme.grey};
  font-size: 0.75rem;
`;

const Dots = styled.span`
  line-height: 1.1;
`;

export default Desc;
