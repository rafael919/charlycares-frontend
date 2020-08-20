import { FormattedNumber, FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';

import warningIcon from 'Assets/icons/warning.svg';
import ProfilePlaceHolder from 'Assets/images/profile-placeholder.png';

function getTranslation(status) {
  switch (status) {
    case 'paid':
      return <FormattedMessage id="payments.angel.home.paid" />;

    case 'unpaid':
      return <FormattedMessage id="payments.angel.home.unpaid" />;

    case 'payout_pending':
      return <FormattedMessage id="payments.angel.home.payout_pending" />;

    case 'payout_approved':
      return <FormattedMessage id="payments.angel.home.payout_approved" />;

    case 'processing':
      return <FormattedMessage id="payments.angel.home.processing" />;

    default:
      return '';
  }
}
const PaymentItem = ({
  warning,
  border,
  divider,
  sum,
  description,
  date,
  paymentDesc,
  div,
  withButton,
  img,
  onSelect,
  angel,
  bottomBorder,
}) => {
  return div ? (
    <DivContainer
      onClick={onSelect}
      withButton={withButton}
      divider={divider}
      border={border}
    >
      <ImageAndDateContainer>
        <div>
          <Image angel={angel} src={img} />
        </div>
        <div>
          <Day>{description}</Day>
          <Date>{date}</Date>
        </div>
      </ImageAndDateContainer>

      <div>
        <Sum warning={warning}>€ {sum}</Sum>
        {warning && (
          <Description warning={warning}>
            {warning}
            <WarningIcon src={warningIcon} />
          </Description>
        )}
        {paymentDesc && (
          <Description>{getTranslation(paymentDesc)}</Description>
        )}
      </div>
    </DivContainer>
  ) : (
    <Container
      onClick={onSelect}
      divider={divider}
      border={border}
      bottomBorder={bottomBorder}
    >
      <ImageAndDateContainer>
        <div>
          <Image angel={angel} src={img != null ? img : ProfilePlaceHolder} />
        </div>
        <div style={{ textAlign: 'left' }}>
          <Day>{description}</Day>
          <Date>{date}</Date>
        </div>
      </ImageAndDateContainer>

      <div>
        <Sum warning={warning}>
          <FormattedNumber currency="EUR" value={sum} style="currency" />
        </Sum>
        {warning && (
          <Description warning={warning}>
            {warning}
            <WarningIcon src={warningIcon} />
          </Description>
        )}
        {paymentDesc && (
          <Description>{getTranslation(paymentDesc)}</Description>
        )}
      </div>
    </Container>
  );
};

const Container = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1.5rem 1rem;
  cursor: pointer;

  ${({ theme }) =>
    !isMobile &&
    `
    background:  #fff;
    border: 1px solid ${theme.defaultGrey};
    border-radius: 0.3125rem;
    margin-bottom: 0.3125rem;
  `}
  ${({ bottomBorder }) =>
    bottomBorder &&
    `
    border: 0px;
    border-radius : 0;
    border-bottom: 1px solid lightGrey;
  `}
   ${props =>
     props.border && `border-bottom: 1px solid ${props.theme.defaultGrey};`}
  ${props =>
    props.divider && props.withButton && isMobile
      ? `
    &:after {
        content: "";
        position: absolute;
        margin-bottom: 0.3125rem;
        width: calc(100% + 58px);
        bottom: 0;
        left: 0;
        background: #f9f8f9;
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
    }
    `
      : props.divider && isMobile
      ? `
    &:after {
        content: "";
        position: absolute;
        margin-bottom: 0.3125rem;
        width: 100%;
        bottom: 0;
        left: 0;
        background: #f9f8f9;
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
    }
    `
      : null};
`;

const DivContainer = Container.withComponent('div');

const ImageAndDateContainer = styled.div`
  display: flex;
`;

const Image = styled.img`
  width: ${({ theme, angel }) => (angel ? '3.8125rem' : '2.5625rem')};
  height: 2.5625rem;
  margin-right: 0.625rem;
  border: 1px solid ${props => props.theme.defaultGrey};
  border-radius: ${({ theme, angel }) => (angel ? '0.25rem' : '50%')};
`;

const Day = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-weight: 600;
  font-size: 1rem;
`;

const Date = styled.div`
  font-size: 0.875rem;
  font-weight: 300;
`;
const Sum = styled.div`
  font-size: 1.125rem;
  color: ${props => props.warning && props.theme.warning};
  text-align: right;
`;
const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.75rem;
  color: ${props =>
    props.warning ? props.theme.warning : props.theme.lightGrey};
`;
const WarningIcon = styled.img`
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-left: 0.2rem;
`;

export default PaymentItem;
