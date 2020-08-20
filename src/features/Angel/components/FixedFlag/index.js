import React from 'react';
import styled from 'styled-components';
import fixed from 'Assets/icons/event-fixed.svg';

const Container = styled.div`
  position: absolute;
  left: -3rem;
  bottom: 2rem;
  background: #e6e6e6;
  opacity: 0.75;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  width: 7.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  font-family: ${({ theme }) => theme.secondaryFont};
  color: #68686e;
  padding: 0.1rem;
  border-radius: 2px;
`;
const Icon = styled.img`
  position: absolute;
  right: 0.2rem;
`;

const FixedFlag = () => (
  <Container>
    Vaste oppas <Icon src={fixed} />
  </Container>
);

export default FixedFlag;
