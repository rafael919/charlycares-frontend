import React from 'react';
import styled from 'styled-components';

import checkIcon from 'Assets/icons/btn-check-on.svg';
import addIcon from 'Assets/icons/btn-check-off.svg';
import { isMobile } from 'react-device-detect';

const StandByListItem = ({ checked, children, onDaySelect }) => {
  return (
    <Row>
      <Text>{children}</Text>
      <Button onClick={onDaySelect}>
        <Icon src={checked ? checkIcon : addIcon} />
      </Button>
    </Row>
  );
};

const Row = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.div`
  font-size: 0.9375rem;
`;

const Button = styled.div`
  font-size: 0.9375rem;
  ${isMobile ? null : `border-color: #fff;`}
`;

const Icon = styled.img`
  margin-right: -0.5rem;
`;

export default StandByListItem;
