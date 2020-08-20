import { FormattedMessage } from 'react-intl';
import { Image } from 'semantic-ui-react';
import FormatedTime from 'Components/FormatedTime';
import React from 'react';
import styled from 'styled-components';

import dayIcon from 'Assets/icons/icn-feature-day-light.svg';
import nightIcon from 'Assets/icons/icn-feature-night.svg';

const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 1rem;
`;

const CostsRow = styled.div`
  display: flex;
  border-bottom: ${props => props.border && '2px solid #E6E6E6'};
  padding: ${props => props.padding && props.padding};
`;

const PriceAndTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1.5;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  margin-right: 1.875rem;
  color: ${props => props.theme.lightGrey};
`;

const Time = styled.div`
  font-size: 0.8125rem;
`;

const PriceIcon = styled(Image)`
  &&& {
    width: 28px;
    height: 28px;
    margin-right: 0.3125rem;
  }
`;

const CalculatedPrice = styled.div`
  font-size: 1rem;
  text-align: right;
  flex: 1;
  align-self: center;
  color: ${props => props.color && props.color};
`;

const CostDescription = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-size: 0.8125rem;
`;

const TotalTitle = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
`;

const Total = styled.div`
  font-size: 1.875rem;
  position: relative;
`;

const PaymentStatus = styled.div`
  position: absolute;
  bottom: -1.6625rem;
  right: 0;
  font-size: 0.75rem;
  color: ${props => props.theme.lightGrey};
`;

const Transaction = ({ payment, normalRate, extraRate, name }) => {
  const { rates, transaction_costs, tip } = payment.costs_summary;
  return (
    <Wrapper>
      <CostsRow>
        <PriceAndTimeWrapper>
          <Price>
            <PriceIcon src={dayIcon} />
            <div>€ {normalRate}</div>
          </Price>
          <Time>
            <FormatedTime time={rates.day_length} />
          </Time>
        </PriceAndTimeWrapper>
        <CalculatedPrice>€ {rates.day_amount.toFixed(2)}</CalculatedPrice>
      </CostsRow>
      <CostsRow>
        <PriceAndTimeWrapper>
          <Price>
            <PriceIcon src={nightIcon} />
            <div>€ {extraRate}</div>
          </Price>
          <Time>
            <FormatedTime time={rates.night_length} />
          </Time>
        </PriceAndTimeWrapper>
        <CalculatedPrice>€ {rates.night_amount.toFixed(2)}</CalculatedPrice>
      </CostsRow>
      <CostsRow padding="0.75rem 0 1rem 0" border>
        <CostDescription>
          <FormattedMessage id="payments.family.details.transactionCosts" />
        </CostDescription>
        <CalculatedPrice>
          € {transaction_costs ? transaction_costs : '0,00'}
        </CalculatedPrice>
      </CostsRow>
      <CostsRow padding="0.75rem 0 1rem 0" border>
        <CostDescription>
          <FormattedMessage id="payments.family.details.cleaningCreditCosts" />
        </CostDescription>
        <CalculatedPrice>- € {payment.credit_used}</CalculatedPrice>
      </CostsRow>
      <CostsRow padding="0.75rem 0 1rem 0" border>
        <CostDescription>
          <FormattedMessage
            id="payments.family.details.tip"
            values={{ name }}
          />
        </CostDescription>
        <CalculatedPrice color="#68686E">
          {tip ? (
            tip
          ) : (
            <FormattedMessage id="payments.family.details.tipValueNone" />
          )}
        </CalculatedPrice>
      </CostsRow>
      <CostsRow padding="1.125rem 0">
        <PriceAndTimeWrapper>
          <TotalTitle>
            <FormattedMessage id="payments.family.details.total" />
          </TotalTitle>
          <Time>
            <FormatedTime time={payment.total_hours} />
          </Time>
          <Total>
            € {payment.total_amount}
            <PaymentStatus>{payment.current_state}</PaymentStatus>
          </Total>
        </PriceAndTimeWrapper>
      </CostsRow>
    </Wrapper>
  );
};

export default Transaction;
