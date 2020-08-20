import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

const AnimationWrapper = posed.div({
  pause: {
    x: '0%',
    opacity: 1,
  },
  resetLeft: {
    x: '30%',
    opacity: 0,
  },
  resetRight: {
    x: '-30%',
    opacity: 0,
  },
  left: {
    x: '-30%',
    opacity: 0,
  },
  right: {
    x: '30%',
    opacity: 0,
  },
});

const SelectedAngelWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SelectedAngel = ({ children, pose }) => {
  return (
    <SelectedAngelWrapper>
      <AnimationWrapper pose={pose}>{children}</AnimationWrapper>
    </SelectedAngelWrapper>
  );
};

export default SelectedAngel;
