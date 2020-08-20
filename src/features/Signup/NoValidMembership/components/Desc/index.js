import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding-bottom: 1.5rem;
  align-items: center;
`;
const Icon = styled.img`
  margin-right: 1rem;
`;
const Text = styled.p`
  font-weight: 300;
  font-size: 0.9375rem;
`;

const Desc = ({ icon, text }) => (
  <Container>
    <Icon src={icon} />
    <Text>{text}</Text>
  </Container>
);

export default Desc;
