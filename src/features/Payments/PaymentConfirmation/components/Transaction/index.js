import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl';
import { Image, Select } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import FormatedTime from 'Components/FormatedTime';
import React, { Fragment } from 'react';
import styled from 'styled-components';

import dayIcon from 'Assets/icons/icn-feature-day-light.svg';
import nightIcon from 'Assets/icons/icn-feature-night-light.svg';

const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 1rem;
`;

const CustomSelect = styled(Select)`
  &&& {
    border: 0;
    background: transparent;
    color: ${props => props.theme.secondaryColor};
    font-family: ${props => props.theme.primaryFont};
    margin-right: -0.6rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & > .text {
      color: ${props => props.theme.secondaryColor} !important;
    }

    & > .menu {
      border: 0;
      z-index: 1000;

      & span {
        color: ${props => props.theme.secondaryColor};
      }
    }
  }
`;

const CostsRow = styled.div`
  display: flex;
  border-bottom: ${props => props.border && '2px solid #E6E6E6'};
  border-top: ${props => props.borderTop && '2px solid #E6E6E6'};
  justify-content: space-between;
  padding: ${props => props.padding && props.padding};
  ${isMobile ? ' overflow: hidden;' : ''};
`;

const PriceAndTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
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
  width: 100%;
  text-align: center;
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
  width: 20%;
  align-self: center;
  color: ${props => props.color && props.color};
`;
const Tip = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none; 
  appearance: none;
  border: none; 
  font-size: 1rem;
  text-align: right;
  align-self: center;
  color: ${props => props.theme.secondaryColor};
  font-family: ${props => props.theme.primaryFont};
  direction: rtl;
  &:focus {
    outline: 0;
  }

  & > option {
    direction: ltr;
  }
`;

const CostDescription = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-size: 0.8125rem;
  align-self: center;
`;

const TotalTitle = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.6;
`;

const Total = styled.div`
  font-size: 1.875rem;
  position: relative;
  color: ${props => props.warning && props.theme.warning};
`;

const tipValues = [0, 2, 5, 10];

const selectTipValues = [
  {
    key: 0,
    value: 0,
    text: '0 €',
  },
  {
    key: 1,
    value: 2,
    text: '2 €',
  },
  {
    key: 2,
    value: 5,
    text: '5 €',
  },
  {
    key: 3,
    value: 10,
    text: '10 €',
  },
];

const Transaction = ({
  warning,
  rates,
  creditUsed,
  tip,
  totalTime,
  angelName,
  totalAmount,
  transactionCosts,
  role,
  fee,
  onTipChange,
  intl,
}) => {
  return (
    <Wrapper>
      <CostsRow>
        <PriceAndTimeWrapper>
          <Price>
            <PriceIcon src={dayIcon} />
            <div>
              {rates && (
                <FormattedNumber
                  value={rates.day_rate ? rates.day_rate : 0}
                  style="currency"
                  currency="EUR"
                />
              )}
            </div>
          </Price>
          <Time>
            <FormatedTime time={rates.day_length} />
          </Time>
        </PriceAndTimeWrapper>
        <CalculatedPrice>
          {rates && (
            <FormattedNumber
              value={rates.day_amount ? rates.day_amount : 0}
              style="currency"
              currency="EUR"
            />
          )}
        </CalculatedPrice>
      </CostsRow>
      <CostsRow>
        <PriceAndTimeWrapper>
          <Price>
            <PriceIcon src={nightIcon} />
            <div>
              {rates && (
                <FormattedNumber
                  value={rates.night_rate ? rates.night_rate : 0}
                  style="currency"
                  currency="EUR"
                />
              )}
            </div>
          </Price>
          <Time>
            <FormatedTime time={rates.night_length} />
          </Time>
        </PriceAndTimeWrapper>
        <CalculatedPrice>
          {rates && (
            <FormattedNumber
              value={rates.night_amount ? rates.night_amount : 0}
              style="currency"
              currency="EUR"
            />
          )}
        </CalculatedPrice>
      </CostsRow>
      <CostsRow padding="0.75rem 0 0.25rem 0" borderTop style={{marginTop: '0.75rem'}}>
        {role === 'family' ? (
          <CostDescription>
            <FormattedMessage id="payments.family.details.transactionCosts" />
          </CostDescription>
        ) : (
          <CostDescription>
            <FormattedMessage id="payments.angel.details.angelFee" /> (
            <FormattedNumber
              value={fee / totalAmount}
              style="percent"
              maximumFractionDigits={2}
              minimuFractionDigits={2}
            />
            )
          </CostDescription>
        )}
        <CalculatedPrice>
          {role === 'family' ? (
            <div>
              <FormattedNumber
                value={transactionCosts ? transactionCosts : 0}
                style="currency"
                currency="EUR"
              />
            </div>
          ) : (
            <Fragment>
              - <FormattedNumber value={fee} style="currency" currency="EUR" />
            </Fragment>
          )}
        </CalculatedPrice>
      </CostsRow>
      <CostsRow padding="0.25rem 0 0.25rem 0">
        <CostDescription>
          <FormattedMessage id="payments.family.details.insuranceFee" />
        </CostDescription>
        <CalculatedPrice>
          <FormattedNumber
            value={rates.insurance_fee}
            style="currency"
            currency="EUR"
          />
        </CalculatedPrice>
      </CostsRow>
      <CostsRow padding="0.25rem 0 1rem 0" border>
        <CostDescription>
          <FormattedMessage id="payments.family.details.hotlineFee" />
        </CostDescription>
        <CalculatedPrice>
          <FormattedNumber
            value={rates.hotline_fee}
            style="currency"
            currency="EUR"
          />
        </CalculatedPrice>
      </CostsRow>
      <CostsRow padding="0.75rem 0 1rem 0" border>
        <CostDescription>
          <FormattedMessage id="payments.family.details.cleaningCreditCosts" />
        </CostDescription>
        <CalculatedPrice>- €{creditUsed && creditUsed}</CalculatedPrice>
      </CostsRow>
      <CostsRow padding="0.75rem 0 1rem 0" border>
        <CostDescription>
          {role === 'family' ? (
            <FormattedMessage
              id="payments.family.details.tip"
              values={{ name: angelName }}
            />
          ) : (
            <FormattedMessage
              id="payments.family.details.tip"
              values={{ name: '' }}
            />
          )}
        </CostDescription>
        {isMobile ? (
          <Tip onChange={onTipChange} value={tip}>
            {tipValues.map(value => {
              if (value === 0) {
                return (
                  <option key={value} value={value}>
                    {intl.formatMessage({
                      id: 'payments.family.details.tipValueNone',
                    })}
                  </option>
                );
              }
              return <option key={value} value={value}>{`€ ${value}`}</option>;
            })}
          </Tip>
        ) : (
          <CustomSelect
            onChange={onTipChange}
            value={tip}
            compact
            options={selectTipValues}
          />
        )}
      </CostsRow>
      <CostsRow padding="1.125rem 0">
        <PriceAndTimeWrapper>
          <TotalTitle>
            <FormattedMessage id="payments.family.details.total" />
          </TotalTitle>
          <Time>
            <FormatedTime time={totalTime} />
          </Time>
          <Total warning={warning}>
            <FormattedNumber
              value={totalAmount ? totalAmount : 0}
              style="currency"
              currency="EUR"
            />
          </Total>
        </PriceAndTimeWrapper>
      </CostsRow>
    </Wrapper>
  );
};

export default injectIntl(Transaction);
