import React from 'react';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-right: 1rem;
`;

const NavIcons = ({ active, onClick, activeIcon, disabledIcon }) => {
  return (
    <Wrapper>
      <Image src={active ? activeIcon : disabledIcon} />
    </Wrapper>
  );
};

export default NavIcons;
