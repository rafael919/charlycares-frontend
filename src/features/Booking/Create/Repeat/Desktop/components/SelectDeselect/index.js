import styled from 'styled-components';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Button = styled.button`
  font-family: ${({ theme }) => theme.primaryFont};
  color: ${({ theme }) => theme.secondaryColor};
  font-size: 0.9375rem;
  background: transparent;
  border: 0;

  &:focus {
    outline: 0;
  }
`;

const SelectDeselect = ({ children, selectedAll, ...rest }) => (
  <Button {...rest}>
    {selectedAll ? (
      <FormattedMessage id="booking.angel.offers.details.deselectAll" />
    ) : (
      <FormattedMessage id="booking.angel.offers.details.selectAll" />
    )}
  </Button>
);

export default SelectDeselect;
