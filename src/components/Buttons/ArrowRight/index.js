import React from 'react';
import styled from 'styled-components';

import arrowRight from 'Assets/icons/btn-large-arrow-right.svg';

const ArrowRightButton = () => {
  return (
    <Button>
      <Icon src={arrowRight} />
    </Button>
  );
};

const Button = styled.div`
  position: absolute;
  right: 0;
  top: 55%;
  transform: translate(70%, -50%);
`;

const Icon = styled.img``;

export default ArrowRightButton;
