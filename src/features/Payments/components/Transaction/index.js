import { FormattedMessage, FormattedNumber } from 'react-intl';
import { Image } from 'semantic-ui-react';
import FormatedTime from 'Components/FormatedTime';
import React, { Fragment } from 'react';
import styled from 'styled-components';

import dayIcon from 'Assets/icons/icn-feature-day-light.svg';
import nightIcon from 'Assets/icons/icn-feature-night-light.svg';

const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 1rem;
`;

const CostsRow = styled.div`
  display: flex;
  border-bottom: ${props => props.border && '2px solid #E6E6E6'};
  border-top: ${props => props.borderTop && '2px solid #E6E6E6'};
  padding: ${props => props.padding && props.padding};
`;

const PriceAndTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  position: relative;
`;

const TotalWrapper = PriceAndTimeWrapper.extend`
  width: auto;
  flex: 1;
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
  flex: 1;
`;

const TotalTime = Time.extend`
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
  width: 30%;
  align-self: center;
  color: ${props => props.color && props.color};
`;

const Values = CalculatedPrice.extend`
  width: auto;
  flex: 1;
`;

const Tip = CalculatedPrice.extend`
  color: ${props => props.theme.primaryText};
  flex: 1;
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

const getTranslation = (status) => {
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

const PaymentStatus = styled.div`
  position: absolute;
  bottom: -1.6625rem;
  width: 100%;
  text-align: right;
  right: 0;
  font-size: 0.75rem;
  color: ${props =>
    props.warning ? props.theme.warning : props.theme.lightGrey};
`;

const Reason = styled.div`
  position: absolute;
  bottom: -1.6625rem;
  width: 100%;
  right: left;
  font-size: 0.875rem;
  font-weight: 300;
`;

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
  state,
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
                  value={rates.day_rate}
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
              value={rates.day_amount}
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
                  value={rates.night_rate}
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
              value={rates.night_amount}
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
              maximumFractionDigits={0}
              minimumFractionDigits={0}
            />
            )
          </CostDescription>
        )}
        <Values>
          {role === 'family' ? (
            <FormattedNumber
              value={transactionCosts}
              style="currency"
              currency="EUR"
            />
          ) : (
            <Fragment>
              - <FormattedNumber value={fee} style="currency" currency="EUR" />
            </Fragment>
          )}
        </Values>
      </CostsRow>
      {role === 'family' && (
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
        )}
      {role === 'family' && (
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
      )}
      <CostsRow padding="0.75rem 0 1rem 0" border>
        <CostDescription>
          <FormattedMessage id="payments.family.details.cleaningCreditCosts" />
        </CostDescription>
        <Values>€{creditUsed && creditUsed}</Values>
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
        <Tip>
          {Number(tip) === 0 && warning ? (
            <FormattedMessage id="payments.family.details.tipValueNone" />
          ) : (
            tip
          )}
          {!warning}
        </Tip>
      </CostsRow>
      <CostsRow padding="1.125rem 0">
        <TotalWrapper>
          <TotalTitle>
            <FormattedMessage id="payments.family.details.total" />
          </TotalTitle>
          <TotalTime>
            <FormatedTime time={totalTime} />
          </TotalTime>
          <Total warning={warning}>
            <FormattedNumber
              value={totalAmount}
              style="currency"
              currency="EUR"
            />
          </Total>
          {warning && (
            <Reason>
              <FormattedMessage id="payments.family.details.reasonOfRefusal" />
            </Reason>
          )}
          <PaymentStatus warning={warning}>
            {warning ? (
              warning
            ) : (
              getTranslation(state)
            )}
          </PaymentStatus>
        </TotalWrapper>
      </CostsRow>
    </Wrapper>
  );
};

export default Transaction;
