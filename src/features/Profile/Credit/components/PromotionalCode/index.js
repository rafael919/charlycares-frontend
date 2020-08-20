import { FormattedMessage, injectIntl } from 'react-intl';
import React from 'react';
import styled from 'styled-components';

const PromotionalCode = ({
  intl,
  isCodeValid,
  onPromoCodeChange,
  promoCode,
  onApply,
  message,
  type,
}) => {
  return (
    <Container>
      <Heading>
        <FormattedMessage id="profile.family.credit.promotionalCode" />
      </Heading>
      <InputContainer>
        <Input
          onChange={onPromoCodeChange}
          placeholder={intl.formatMessage({
            id: 'profile.family.credit.inputPlaceholder',
          })}
          value={promoCode}
        />
        <ApplyBtn onClick={onApply}>
          <FormattedMessage id="profile.family.credit.applyBtnText" />
        </ApplyBtn>
      </InputContainer>
      {isCodeValid && (
        <MessageContainer>
          <Message type={type}>{message}</Message>
        </MessageContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 1.25rem 1rem;
`;
const Heading = styled.h2`
  font-size: 1rem;
`;
const ApplyBtn = styled.button`
  padding: 0;
  border: 0;
  margin: 0;
  font-family: ${props => props.theme.primaryFont};
  font-size: 1rem;
  color: ${props => props.theme.secondaryColor};
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  background-color: ${props => props.theme.defaultGrey};
  border-radius: 29px;
  border: 1px solid ${props => props.theme.defaultGrey};
  display: block;
  width: 100%;
  font-size: 0.9375rem;
  height: 2.3125rem;
  padding: 0 4rem 0 1rem;
  caret-color: #000;

  ::placeholder {
    color: ${props => props.theme.grey};
  }

  &:focus {
    outline: 0;
  }
`;

const MessageContainer = styled.div`
  padding: 1rem 0;
`;
const Message = styled.div`
  font-size: 0.9375rem;
  padding-left: 1rem;
  font-weight: 300;
  position: relative;
  color: ${({ type, theme }) =>
    type === 'invalid' || type === 'not_found'
      ? theme.secondaryColor
      : theme.green};

  &:before {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    background: ${props => props.theme.secondaryColor};
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default injectIntl(PromotionalCode);
