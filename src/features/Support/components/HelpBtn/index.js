import React from 'react';
import styled from 'styled-components';

import phoneIcon from 'Assets/icons/btn-phone.svg';

const HelpBtn = () => (
  <Button href="tel:+31202102323">
    <span>Help</span> <Icon src={phoneIcon} />
  </Button>
);

const Button = styled.a`
  border: 0;
  background: transparent;
  display: inline-flex;
  font-family: ${props => props.theme.primaryFont};
  color: ${props => props.theme.secondaryColor};
  align-items: center;
`;

const Icon = styled.img`
  width: 31px;
  height: 28px;
`;

export default HelpBtn;
