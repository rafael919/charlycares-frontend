import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid #c7c7c9;
  margin-top: 0.5rem;
  min-height: 100%;
`;

const Hour = styled.div`
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.primaryFont};
  font-weight: 300;
  width: 2.0625rem;
  height: 2.5rem;
  text-align: center;
  color: ${({ available }) => (available ? 'inherit' : '#c7c7c9')};
`;

const Hours = ({ hours }) => (
  <Container>
    {hours.map((hour, i) => {
      if (i === hours.length - 3) {
        return (
          <Hour available key={i}>
            {hour.time}
          </Hour>
        );
      }
      return (
        <Hour
          id={hour.time === '07' ? 'start' : null}
          available={hour.available}
          key={i}
        >
          {hour.time}
        </Hour>
      );
    })}
  </Container>
);

export default Hours;
