import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import dayIcon from 'Assets/icons/icn-feature-day.svg';
import nightIcon from 'Assets/icons/icn-feature-night.svg';
import infoIcon from 'Assets/icons/btn-info.svg';

import Icons from './components/Icons';

const Rate = ({
  initialNormal,
  initialExtra,
  minRate,
  currentExtra,
  currentNormal,
  maxNormal,
  maxExtra,
  onRateIncrease,
  onRateDecrease,
}) => {
  return (
    <Container>
      <HeadingContainer>
        <Heading>
          <FormattedMessage id="profile.angel.edit.ratesHeading" />
        </Heading>
        <InfoButton>
          <InfoIcon src={infoIcon} />
        </InfoButton>
      </HeadingContainer>
      <RateContainer>
        <InnerRateContainer>
          <Icon src={dayIcon} />
          <div>
            <Time>
              <FormattedMessage id="profile.angel.edit.ratesDay" />
            </Time>
            <InitialRate>
              <FormattedMessage id="profile.angel.edit.initialRate" />
              {'  '}
              <FormattedNumber
                style="currency"
                currency="EUR"
                minimumFractionDigits={1}
                value={initialNormal}
              />
            </InitialRate>
          </div>
        </InnerRateContainer>
        <InnerBtnsContainer>
          <Button onClick={onRateDecrease('Normal')}>
            <Icons remove disabled={currentNormal === minRate} />
          </Button>
          <RateValue>
            {' '}
            <FormattedNumber
              style="currency"
              currency="EUR"
              value={currentNormal}
            />
          </RateValue>
          <Button onClick={onRateIncrease('Normal')}>
            <Icons add disabled={currentNormal === maxNormal} />
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
                minimumFractionDigits={1}
                value={initialExtra}
              />
            </InitialRate>
          </div>
        </InnerRateContainer>
        <InnerBtnsContainer>
          <Button onClick={onRateDecrease('Extra')}>
            <Icons remove disabled={currentExtra === minRate} />
          </Button>
          <RateValue>
            {' '}
            <FormattedNumber
              style="currency"
              currency="EUR"
              value={currentExtra}
            />
          </RateValue>
          <Button onClick={onRateIncrease('Extra')}>
            <Icons add disabled={currentExtra === maxExtra} />
          </Button>
        </InnerBtnsContainer>
      </RateContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.25rem 1rem 1.25rem;
`;

const Heading = styled.h2`
  font-family: ${props => props.theme.primaryFont};
  font-size: 1rem;
  margin-bottom: 0;
`;
const HeadingContainer = styled.div`
  position: relative;
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
const InfoIcon = Icon.extend`
  margin-right: 0;
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

const InfoButton = Button.extend`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
`;

export default Rate;
