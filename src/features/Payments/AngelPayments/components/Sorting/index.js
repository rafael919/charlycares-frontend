import { FormattedNumber, injectIntl } from 'react-intl';
import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import arrowDown from 'Assets/icons/btn-small-arrow-down.svg';

const Sorting = ({
  paymentsPerYear,
  onYearSelect,
  selectedYear = {},
  intl,
}) => {
  const selectedYearKey = selectedYear ? Object.keys(selectedYear)[0] : null;
  return (
    <Container>
      {selectedYearKey ? (
        <div>
          {intl.formatMessage(
            {
              id: 'payments.angel.home.total',
            },
            { year: selectedYearKey }
          )}
        </div>
      ) : null}
      {selectedYearKey ? (
        <SelectWrapper>
          <FormattedNumber
            style="currency"
            value={selectedYear[selectedYearKey]}
            currency="EUR"
          />

          <Select onChange={onYearSelect}>
            {paymentsPerYear.map(year => {
              const key = Object.keys(year);
              return (
                <option key={key[0]} value={[key[0]]}>
                  {[key[0]]}
                </option>
              );
            })}
          </Select>
        </SelectWrapper>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  font-family: ${props => props.theme.secondaryFont};
  font-size: 0.9375rem;
  color: ${props => props.theme.lightGrey};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${isMobile ? '0 1.8rem' : '0 1.5rem 0 0'};
`;

const Select = styled.select`
  opacity: 0;
  width: calc(100% + 1.5rem);
  position: absolute;
  right: -1.5rem;
  top: 0;
  cursor: pointer;
`;

const SelectWrapper = styled.div`
  position: relative;
  &::after {
    content: '';
    width: 1rem;
    height: 1rem;
    position: absolute;
    right: -1.5rem;
    background: url(${arrowDown}) no-repeat 50% 50%;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default injectIntl(Sorting);
