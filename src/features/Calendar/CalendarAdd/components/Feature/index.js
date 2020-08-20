import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import blockIcon from 'Assets/icons/icn-block.svg';
import fixedSittingIcon from 'Assets/icons/icn-fixed-sitting.svg';
import standByIcon from 'Assets/icons/icn-standby.svg';
import arrowRight from 'Assets/icons/btn-large-arrow-right.svg';
import calendarIcon from 'Assets/icons/btn-calendar.svg';
import calendarBlackIcon from 'Assets/icons/calendar.svg';

const Feature = ({
  notAvailable,
  fixed,
  calendar,
  standBy,
  title,
  children,
  onClick,
}) => {
  return (
    <Container calendar={calendar} onClick={onClick}>
      <div>
        <Icon
          src={
            notAvailable
              ? blockIcon
              : fixed
              ? fixedSittingIcon
              : calendar
              ? onClick
                ? calendarIcon
                : calendarBlackIcon
              : standBy && standByIcon
          }
        />
      </div>
      <TextContainer>
        <Heading>{title}</Heading>
        <Description>{children}</Description>
      </TextContainer>
      {onClick && typeof onClick === 'function' ? (
        <ArrowIcon src={arrowRight} />
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 0;
  padding-right: 0.5rem;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #e6e6e6;
  cursor: pointer;
  width: 100%;
  ${props => props.calendar && !props.onClick && `opacity: 0.5;`}
  ${isMobile &&
    `
  &:last-child {
    border-bottom: 0;
  }
  
  `};
`;

const TextContainer = styled.div`
  margin-left: 0.5rem;
  padding-right: 0.5rem;
`;

const Heading = styled.h2`
  font-size: 1rem;
  padding-top: 0.3rem;
  line-height: 1.5;
  margin-bottom: 0.4rem;
`;

const Description = styled.p`
  font-size: 0.75rem;
  line-height: 1.42;
  color: ${props => props.theme.grey};
`;

const Icon = styled.img``;
const ArrowIcon = Icon.extend`
  align-self: center;
  margin-right: -0.5rem;
`;

export default Feature;
