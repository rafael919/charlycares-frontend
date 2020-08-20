import { createSelectable } from 'react-selectable-fast';
import React from 'react';
import styled from 'styled-components';

export const Cell = styled.div`
  height: 2.5rem;
  border: 0;
  outline: 0;
  border-bottom: ${({ available }) =>
    available ? '1px solid #c7c7c9;' : 'none;'};
  background: ${({ available, selected, theme, selecting }) => {
    if (selecting) {
      return 'rgba(245, 107, 135, 0.4)';
    }
    if (selected) {
      return theme.secondaryColor;
    }

    if (available) {
      return '#fff';
    }
    return '#e6e6e6';
  }};
`;

const CCell = ({ selectableRef, selected, selecting, ...rest }) => (
  <Cell
    {...rest}
    innerRef={selectableRef}
    selected={selected}
    selecting={selecting}
  />
);

export default createSelectable(CCell);
