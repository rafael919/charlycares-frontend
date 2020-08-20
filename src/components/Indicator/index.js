import styled from 'styled-components';
import React from 'react';

const Indicator = styled.div`
  display: flex;
  height: 22px;
  min-width: 22px;
  border-radius: 11px;
  background-color: #4286f4;
  border: 1.5px solid #fff;
  align-items: center;
  justify-content: center;
  ${props =>
    !props.position &&
    `position: absolute;
  right: 0;
  top: 0;`}
  ${props =>
    props.offSet &&
    `position: absolute;
  right: -0.5rem;
  top: -0.5rem;`}
`;

const Text = styled.span`
  font-size: 0.75rem;
  color: white;
  text-align: center;
  font-family: ${props => props.theme.secondaryFont};
`;

const IndicatorComponent = ({ position, messageCount, offSet }) => (
  <Indicator position={position} offSet={offSet} >
    <Text>{messageCount}</Text>
  </Indicator>
);

export default IndicatorComponent;
