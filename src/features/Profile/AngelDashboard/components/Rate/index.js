import React from 'react';
import styled from 'styled-components';

import dayIcon from 'Assets/icons/icn-feature-day.svg';
import nightIcon from 'Assets/icons/icn-feature-night.svg';

import Icons from './components/Icons';
import { FormattedNumber, FormattedMessage } from 'react-intl';

const Rate = ({ rates, onRateIncrease, onRateDecrease }) => {
  const { extra, extraMax, normal, normalMax } = rates; 
  return (
    <Container>
      <HeadingContainer>
        <Heading>
          <FormattedMessage id="profile.angel.dashboard.rate.heading" />
        </Heading>
      </HeadingContainer>
      <RateContainer>
        <InnerRateContainer>
          <Icon src={dayIcon} />
          <div>
            <Time>
              <FormattedMessage id="profile.angel.edit.ratesDay" />
            </Time>
            <InitialRate>
              <FormattedMessage id="profile.angel.edit.initialRate" />{' '}
              <FormattedNumber
                style="currency"
                currency="EUR"
                value={rates.initialNormal || 0}
              />
            </InitialRate>
          </div>
        </InnerRateContainer>
        <InnerBtnsContainer>
          <Button onClick={onRateDecrease('normal')}>
            <Icons remove />
          </Button>
          <RateValue>
            <FormattedNumber
              style="currency"
              currency="EUR"
              value={rates.normal || 0}
            />
          </RateValue>
          <Button onClick={onRateIncrease('normal')}>
            <Icons add disabled={normal >= normalMax} />
          </Button>
        </InnerBtnsContainer>
      </RateContainer>
      <RateContainer>
        <InnerRateContainer>
          <Icon src={nightIcon} />
          <div>
            <Time>
              <FormattedMessage id="profile.angel.edit.ratesNight" />
            </Time>
            <InitialRate>
              <FormattedMessage id="profile.angel.edit.initialRate" />{' '}
              <FormattedNumber
                style="currency"
                currency="EUR"
                value={rates.initialExtra || 0}
              />
            </InitialRate>
          </div>
        </InnerRateContainer>
        <InnerBtnsContainer>
          <Button onClick={onRateDecrease('extra')}>
            <Icons remove />
          </Button>
          <RateValue>
            <FormattedNumber
              style="currency"
              currency="EUR"
              value={rates.extra || 0}
            />
          </RateValue>
          <Button onClick={onRateIncrease('extra')}>
            <Icons add disabled={extra >= extraMax} />
          </Button>
        </InnerBtnsContainer>
      </RateContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.25rem 1rem 1.25rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 1rem;
    width: calc(100% - 2rem);
    height: 1px;
    background: ${props => props.theme.defaultGrey};
  }
`;

const Heading = styled.h2`
  font-family: ${props => props.theme.primaryFont};
  font-size: 1.25rem;
  margin-bottom: 0;
`;
const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 1.5rem;
`;

const RateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InnerRateContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const InnerBtnsContainer = InnerRateContainer.extend`
  justify-content: space-between;
  flex: 1.2;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 0.5rem;
`;

const Time = styled.div`
  font-size: 0.9375rem;
`;

const InitialRate = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.grey};
`;
const RateValue = styled.div`
  font-size: 1.125rem;
`;

const Button = styled.button`
  border: 0;
  background: transparent;

  &:focus {
    outline: 0;
  }
`;

export default Rate;
