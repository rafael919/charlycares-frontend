import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import availableIcon from 'Assets/icons/icn-check-blue.svg';
import notAvailableIcon from 'Assets/icons/icn-check-grey.svg';

const getDataForType = (period, splitBy, feature) => {
  const envConst = `REACT_APP${period}SUBSCRIPTION${
    feature.length > 0 ? feature.toUpperCase() : ''
  }`;
  return String(process.env[envConst]).split(splitBy);
};

const renderPricePerMonthAndCostsPerSitting = (
  selectedType,
  period,
  feature,
  typeInitialIndex
) => {
  const pricesArr = getDataForType(period, '|', feature);

  return pricesArr.map((price, i) => {
    return (
      <Cell active={typeInitialIndex === i} key={i}>
        {price}
      </Cell>
    );
  });
};

const renderFirstMonthAndMonthlyTerminable = (
  selectedType,
  period,
  feature,
  typeInitialIndex
) => {
  const firstMonthArr = getDataForType(period, ',', feature);
  return firstMonthArr.map((cost, i) => {
    if (cost === 'true' || cost === 'false') {
      return (
        <Cell active={typeInitialIndex === i} key={i}>
          <Icon
            src={typeInitialIndex === i ? availableIcon : notAvailableIcon}
          />
        </Cell>
      );
    }
    return (
      <Cell key={i}>
        <NotSupported />
      </Cell>
    );
  });
};

const Prices = ({ selectedType = '', period = '', typeIndex }) => {
  return (
    <Container>
      <Heading>
        <FormattedMessage id="profile.family.membership.pricePerMonth" />
      </Heading>
      <SubHeading>
        <FormattedMessage
          id="profile.family.membership.freeMonth"
          values={{ date: '10-10-2018' }}
        />
      </SubHeading>
      <Row>
        {renderPricePerMonthAndCostsPerSitting(
          selectedType,
          period,
          '',
          typeIndex
        )}
      </Row>
      <Heading>
        <FormattedMessage id="profile.family.membership.costsPerSitting" />
      </Heading>
      <Row>
        {renderPricePerMonthAndCostsPerSitting(
          selectedType,
          period,
          '_per_sitting_service',
          typeIndex
        )}
      </Row>
      <Heading>
        <FormattedMessage id="profile.family.membership.firstMonth" />
      </Heading>
      <Row>
        {renderFirstMonthAndMonthlyTerminable(
          selectedType,
          period,
          '_first_month',
          typeIndex
        )}
      </Row>
      <Heading>
        <FormattedMessage id="profile.family.membership.monthlyTerminalble" />
      </Heading>
      <Row>
        {renderFirstMonthAndMonthlyTerminable(
          selectedType,
          period,
          '_monthly_terminable',
          typeIndex
        )}
      </Row>
    </Container>
  );
};

const Container = styled.div`
  padding: 0.5rem 1rem 5rem;
  width: 100%;
`;

const Heading = styled.div`
  font-size: 0.8125rem;
  font-weight: 600;
  text-align: center;
`;
const SubHeading = styled.div`
  font-size: 0.8125rem;
  font-weight: 400;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.125rem;
  margin-top: 0.5rem;
`;

const Cell = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid ${props => props.theme.defaultGrey};
  font-weight: ${props => (props.active ? 600 : 300)};
  font-size: 0.9375rem;
  padding: 0.5rem 0;

  &:last-child {
    border-right: 0;
  }
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
`;

const NotSupported = styled.div`
  width: 12px;
  height: 3px;
  background-color: #c7c7c9;
`;

export default Prices;
