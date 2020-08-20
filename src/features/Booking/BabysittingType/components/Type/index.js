import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import arrowRight from 'Assets/icons/btn-large-arrow-right.svg';

const Type = ({
	icon,
	header,
	explanation,
	onClick
}) => {
  return (
    <Container onClick={onClick}>
      <div>
        <Icon
          src={
            icon
          }
        />
      </div>
      <TextContainer>
        <Heading>{header}</Heading>
        <Description>{explanation}</Description>
      </TextContainer>
    	<ArrowIcon src={arrowRight} />
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 0;
  padding-right: 0.75rem;
  padding-left: 0rem;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #e6e6e6;
  cursor: pointer;
  width: 100%;
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
  font-size: 0.875rem;
  padding-top: 0rem;
  line-height: 1.5;
  margin-bottom: 0.4rem;
`;

const Description = styled.p`
  font-size: 0.75rem;
  line-height: 1.42;
  color: ${props => props.theme.grey};
`;

const Icon = styled.img`
  margin-right: 0.5rem;
`;
const ArrowIcon = Icon.extend`
  align-self: center;
  margin-right: -0.5rem;
`;

export default Type;
