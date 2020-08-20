import { FormattedMessage } from 'react-intl';
import { Image } from 'semantic-ui-react';
import React from 'react';
import styled from 'styled-components';

import addIcon from 'Assets/icons/btn-check-off.svg';
import checkedIcon from 'Assets/icons/btn-check-on.svg';

const Reason = ({ selectedReason, value, onSelect }) => {
  return (
    <ReasonItem>
      <ReasonText>
        <FormattedMessage id={`booking.angel.decline.${value}`} />
      </ReasonText>
      <Button onClick={onSelect}>
        <Image src={selectedReason.includes(value) ? checkedIcon : addIcon} />
      </Button>
    </ReasonItem>
  );
};

const ReasonItem = styled.li`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #e6e6e6;
  padding: 1rem 0;
  align-items: center;
  justify-content: space-between;

  &:first-child {
    border-top: 1px solid #e6e6e6;
  }
`;

const ReasonText = styled.div`
  font-weight: 300;
  font-size: 0.9375rem;
`;

const Button = styled.button`
  background: transparent;
  border: 0;

  &:focus {
    outline: 0;
  }
`;

export default Reason;
