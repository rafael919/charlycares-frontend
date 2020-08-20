import { injectIntl } from 'react-intl';
import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';

import arrowDown from 'Assets/icons/btn-small-arrow-down.svg';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${isMobile ? 'center' : 'flex-end'};
  position: relative;
  padding: ${isMobile ? 0 : '0.5rem 0'};
  padding-right: 2.2rem;
`;

const Select = styled.select`
  background: transparent;
  border: 0;
  font-family: ${props => props.theme.secondaryFont};
  color: ${props => props.theme.lightGrey};
  font-size: 0.9375rem;
  z-index: 1;
  direction: rtl;
  cursor: pointer;
  opacity: 0;
  position: absolute;
  right: 0;

  &:focus {
    outline: 0;
  }
`;

const Icon = styled.img`
  position: absolute;
  right: 8px;
  top: 55%;
  transform: translateY(-50%);
  z-index: 0;
`;

const makeListOfFilters = intl => [
  {
    value: 0,
    text: intl.formatMessage({ id: 'favorites.filters.lastMessage' }),
  },
  {
    value: 1,
    text: intl.formatMessage({ id: 'favorites.filters.lastBooking' }),
  },
  {
    value: 2,
    text: intl.formatMessage({ id: 'favorites.filters.alphabetical' }),
  },
  // {
  //   value: 3,
  //   text: intl.formatMessage({ id: 'favorites.filters.responseTime' }),
  // },
  // {
  //   value: 4,
  //   text: intl.formatMessage({ id: 'favorites.filters.priceAscending' }),
  // },
  // {
  //   value: 5,
  //   text: intl.formatMessage({ id: 'favorites.filters.priceDescending' }),
  // },
];

const FilterButton = ({ intl, onFilterChange, value }) => {
  const filters = makeListOfFilters(intl);
  const filter = filters.find(item => {
    return item.value === value;
  });
  return (
    <Container>
      {filter && filter.text ? filter.text : filters[0].text}
      <Select onChange={onFilterChange}>
        {filters.map(filter => {
          return (
            <option key={filter.value} value={filter.value}>
              {filter.text}
            </option>
          );
        })}
      </Select>
      <Icon src={arrowDown} />
    </Container>
  );
};

export default injectIntl(FilterButton);
