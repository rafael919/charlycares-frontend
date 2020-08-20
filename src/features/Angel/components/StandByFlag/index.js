import React from 'react';
import styled from 'styled-components';
import standby from 'Assets/icons/icn-standby-white.svg';

const Container = styled.div`
  position: absolute;
  left: 5rem;
  bottom: 2rem;
  background: #f56b87;
  opacity: 0.85;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  width: 7.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  font-family: ${({ theme }) => theme.secondaryFont};
  color: #fff;
  padding: 0.1rem;
  border-radius: 2px;
`;
const Icon = styled.img`
  position: absolute;
  left: 0.2rem;
`;

const StandByFlag = () => (
  <Container>
    <Icon src={standby} /> Stand-by
  </Container>
);

export default StandByFlag;
