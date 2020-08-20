import React from 'react';
import styled, { keyframes } from 'styled-components';

import curry from 'ramda/es/curry';
import memoizeWith from 'ramda/es/memoizeWith';
import { isMobile } from 'react-device-detect';

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

const StatusContainer = styled.a`
  border-radius: 2px;
  background-color: ${({ accepted, pending, theme }) =>
    accepted ? theme.acceptedGreen : theme.pendingYellow};
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.4);
  width: 70%;
  position: absolute;
  ${({ from, to, startHasMinutes, endHasMinutes }) =>
    calculatePosition(from, to, startHasMinutes, endHasMinutes)}
  left: 50%;
  transform: translateX(-50%);
  will-change: auto;
  animation: ${slideDown} 0.6s ease-in;
  cursor: pointer;
  z-index: 100;
`;

const StatusText = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 50%;
  text-align: right;
  writing-mode: vertical-rl;
  transform: translateX(-50%) rotate(-180deg);
  font-size: 0.75rem;
  color: #fff;
  line-height: 1.42;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-height: 90%;
  overflow: hidden;
`;

const TextContainer = styled.div`
  position: relative;
  height: 100%;
`;

const navigateToBookingPage = memoizeWith(
  (_, id) => id,
  curry((history, id, _ev) =>
    isMobile
      ? history.push('/booking/angel-booking/' + id)
      : history.push('/booking/angel-booking/' + id)
  )
);

const Status = ({
  children,
  history,
  booking_id,
  from,
  to,
  accepted,
  pending,
  invitation_id,
}) => (
  <StatusContainer
    onClick={navigateToBookingPage(history, invitation_id)}
    accepted={accepted}
    pending={pending}
    from={from}
    to={to}
  >
    <TextContainer>
      <StatusText>{children}</StatusText>
    </TextContainer>
  </StatusContainer>
);

export default Status;
