import React from 'react';
import styled from 'styled-components';

const StyledCell = styled.div.attrs({
  role: 'button',
})`
  background-color: ${props => (props.available ? '#C1F2E1' : '#e6e6e6')};
  min-width: 100%;
  min-height: 2.5rem;
  margin-bottom: 0.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  color: ${props =>
    props.available ? props.theme.primaryTextColor : '#a9a9ac'};
`;

const Cell = ({ onClick, children, available }) => {
  return (
    <StyledCell available={available} onClick={onClick}>
      {children}
    </StyledCell>
  );
};

export default Cell;
