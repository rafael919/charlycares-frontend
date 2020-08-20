import styled from 'styled-components';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Button = styled.button`
  font-family: ${({ theme }) => theme.primaryFont};
  color: ${({ theme }) => theme.secondaryColor};
  font-size: 0.9375rem;
  -webkit-appearance: none;
  border-radius: 0;
  background: none;
  border: 0;
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
