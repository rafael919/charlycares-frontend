import styled, { keyframes } from 'styled-components';
import pick from 'ramda/es/pick';
import React from 'react';

import reload from 'Assets/icons/icn-fixed-sitting-small.svg';

const calculatePosition = period => {
  if (period === 'morning') {
    return `top: 20rem; bottom: 37rem;`;
  }
  if (period === 'afternoon') {
    return `top: 32.7rem; bottom: 22.2rem;`;
  }
  if (period === 'evening') {
    return `top: 47.7rem; bottom: 9.7rem;`;
  }
};

const slideDown = keyframes`
  from {
     max-height: 0;
  }

  to {
    max-height: 21.785rem;
  }
`;

const AvailabilityColumn = styled.div`
  background: rgba(170, 170, 170, 0.4);
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
  width: 90%;
  position: absolute;
  ${({ period }) => calculatePosition(period)}
  left: 50%;
  transform: translateX(-50%);
  animation: ${slideDown} 0.6s ease-in;
  z-index: 2;

  &::after {
    content: '';
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3;
    background: url(${reload}) no-repeat center;
  }
`;

const Availability = ({ day }) => {
  if (day) {
    const periods = Object.entries(
      pick(['morning', 'afternoon', 'evening'], day)
    ).filter(val => val[1] === 1);
    return periods.map((period, i) => {
      return (
        <AvailabilityColumn
          key={i}
          period={period[1] === 1 ? period[0] : null}
        />
      );
    });
  }
  return null;
};

export default Availability;
