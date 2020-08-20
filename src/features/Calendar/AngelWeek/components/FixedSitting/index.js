import styled, { keyframes } from 'styled-components';

import reload from 'Assets/icons/icn-fixed-sitting-small.svg';

const calculatePosition = (from, to, startHasMinutes, endHasMinutes) => {
  let defaultTop = 2.7;
  let defaultBottom = 7.2;

  if (from > to) {
    to = 24;
    defaultBottom = 0;
  }

  return `top: ${
    startHasMinutes ? from * 2.5 + 1.1 + defaultTop : from * 2.5 + defaultTop
  }rem; bottom: ${
    endHasMinutes
      ? (24 - to) * 2.5 + defaultBottom - 1.8
      : (24 - to) * 2.5 + defaultBottom
  }rem;`;
};

const slideDown = keyframes`
  from {
     max-height: 0;
  }

  to {
    max-height: 21.785rem;
  }
`;

const FixedSitting = styled.div`
  background: rgba(170, 170, 170, 0.4);
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
  width: 90%;
  position: absolute;
  ${({ from, to, startHasMinutes, endHasMinutes }) =>
    calculatePosition(from, to, startHasMinutes, endHasMinutes)}
  left: 50%;
  transform: translateX(-50%);
  animation: ${slideDown} 0.6s ease-in;

  &::after {
    content: '';
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    background: url(${reload}) no-repeat center;
  }
`;

export default FixedSitting;
