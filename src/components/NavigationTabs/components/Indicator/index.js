import React from 'react';
import styled from 'styled-components';

const Indicator = styled.div`
  display: flex;
  height: 22px;
  min-width: 22px;
  border-radius: 11px;
  background-color: #4286f4;
  border: 1.5px solid #fff;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0.5rem;
  top: 0.15rem;
`;

const Text = styled.span`
  font-size: 0.75rem;
  color: white;
  text-align: center;
  font-family: ${props => props.theme.secondaryFont};
`;

const IndicatorComponent = ({ count }) => (
  <Indicator>
    <Text>{count}</Text>
  </Indicator>
);

export default IndicatorComponent;
