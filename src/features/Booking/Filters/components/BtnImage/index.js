import React from 'react';
import styled from 'styled-components';

import btnAdd from 'Assets/icons/btn-check-off.svg';
import btnChecked from 'Assets/icons/btn-check-on.svg';

const Image = styled.img`
  width: 44px;
`;

const Button = styled.button`
  background: transparent;
  border: 0;

  &:focus {
    outline: 0;
  }
`;

const BtnImage = ({ selected, ...props }) => (
  <Button {...props}>
    <Image src={selected ? btnChecked : btnAdd} />
  </Button>
);

export default BtnImage;
