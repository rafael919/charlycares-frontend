import styled, { keyframes } from 'styled-components';

import block from 'Assets/icons/icn-block.svg';
import pattern from 'Assets/images/pattern-dash.png';

const calculatePosition = (from, to, startHasMinutes, endHasMinutes) => {
  let defaultTop = 2.7;
  let defaultBottom = 7.2;
  const fromHours = from.hours();
  const toHours = to.hours();

  if (fromHours > toHours) {
    to = 24;
    defaultBottom = 0;
  }

  return `top: ${
    startHasMinutes
      ? fromHours * 2.5 + 1.1 + defaultTop
      : fromHours * 2.5 + defaultTop
  }rem; bottom: ${
    endHasMinutes
      ? (24 - toHours) * 2.5 + defaultBottom - 1.8
      : (24 - toHours) * 2.5 + defaultBottom
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

const Unavailable = styled.div`
  background: rgba(241, 212, 220, 0.6) url(${pattern}) repeat;
  border: 1px solid #e7b6c4;
  width: 90%;
  position: absolute;
  ${({ from, to, startHasMinutes, endHasMinutes }) =>
    calculatePosition(from, to, startHasMinutes, endHasMinutes)}
  left: 50%;
  transform: translateX(-50%);
  animation: ${slideDown} 0.6s ease-in;
  cursor: pointer;
  z-index: 9;

  &::after {
    content: '';
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 0;
    right: 0;
    background: url(${block}) no-repeat center;
    opacity: 0.6;
    z-index: 10;
  }
`;

export default Unavailable;
