import React from 'react';
import styled from 'styled-components';
import checkIcon from 'Assets/icons/icn-check-blue.svg';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1.5rem;
`;

const Icon = styled.img`
  margin-right: 1rem;
`;

const Text = styled.p`
  font-size: 0.9375rem;
  font-weight: 300;
`;

const NoFee = ({ text }) => (
  <Container>
    <Icon src={checkIcon} />
    <Text>{text}</Text>
  </Container>
);

export default NoFee;
