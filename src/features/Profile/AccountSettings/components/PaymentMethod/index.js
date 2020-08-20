import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';
import { generateLink } from 'Utils';

import btnEdit from 'Assets/icons/btn-edit.svg';
import creditCardIcon from 'Assets/icons/icn-feature-payment-card.svg';

import Container from '../Container';
import Heading from '../Heading';

const sliceLastFour = accNumber => accNumber.slice(-4);

const PaymentMethod = ({
  link,
  accountNumber,
  isIBANEdited,
  onIBANChange,
  onIBANEdit,
  ibanInput,
  onIBANBlur,
  isIBANValid,
  iban,
  role,
  activePayments,
}) => {
  return (accountNumber && accountNumber.length) || role === 'angel' ? (
    <Container>
      <Heading>
        <FormattedMessage id="profile.family.paymentMethod" />
      </Heading>
      <MethodContainer>
        <CardContainer>
          <Icon src={creditCardIcon} />
          <div>
            {isIBANEdited ? (
              <IBANNumber
                innerRef={ibanInput}
                onBlur={onIBANBlur}
                onChange={onIBANChange}
                value={iban}
              />
            ) : (
              <CreditCardNumber>
                <Dots>.........</Dots>
                <span>{sliceLastFour(iban ? iban : accountNumber)}</span>
              </CreditCardNumber>
            )}
            {!isIBANValid && role === 'angel' && isIBANEdited && (
              <IBANError>
                <FormattedMessage id="errors.IBANNotValid" />
              </IBANError>
            )}
            <PaymentDesc>bank/credit</PaymentDesc>
          </div>
        </CardContainer>
        {link ? (
          <EditButton href={generateLink(link)}>
            <EditIcon src={btnEdit} />
          </EditButton>
        ) : (
          <EditButtonAngel onClick={onIBANEdit}>
            <EditIcon src={btnEdit} />
          </EditButtonAngel>
        )}
      </MethodContainer>
    </Container>
  ) : (
    <Container>
      <Heading>
        <FormattedMessage id="profile.family.paymentMethod" />
      </Heading>
      <MethodContainer>
        <CreditCardNumber>
          {activePayments ? (
            <FormattedMessage id="profile.family.bankaccountConnected" />
          ) : (
            <FormattedMessage id="profile.family.bankaccountNotConnected" />
          )}
        </CreditCardNumber>
        <EditButton href={generateLink(link)}>
          <EditIcon src={btnEdit} />
        </EditButton>
      </MethodContainer>
    </Container>
  );
};

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
const EditButtonAngel = styled.button`
  border: 0;
  background: transparent;
  padding: 0;

  &:focus {
    outline: 0;
  }
`;

const CreditCardNumber = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-size: 1rem;
  display: inline-flex;
`;
const IBANNumber = styled.input`
  font-family: ${props => props.theme.primaryFont};
  font-size: 1rem;
  display: inline-flex;
  caret-color: #000;

  &:focus {
    outline: 0;
  }
`;
const PaymentDesc = styled.div`
  color: ${props => props.theme.grey};
  font-size: 0.75rem;
`;
const IBANError = styled.div`
  color: ${props => props.theme.warning};
  font-size: 0.75rem;
`;
const Dots = styled.span`
  line-height: 1.1;
`;

export default PaymentMethod;
