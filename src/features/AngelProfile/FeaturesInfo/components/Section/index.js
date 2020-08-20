import React from 'react';
import styled from 'styled-components';
import { Paragraph } from 'Components/Text';

import proIcon from 'Assets/icons/icn-feature-pro.svg';
import babyIcon from 'Assets/icons/icn-feature-baby.svg';
import carIcon from 'Assets/icons/icn-feature-driverslicence.svg';
import firstAidIcon from 'Assets/icons/icn-feature-first-aid.svg';
import insuranceIcon from 'Assets/icons/icn-feature-insurance.svg';

const getRightImg = feature => {
  switch (feature) {
    case 'pro':
      return proIcon;
    case 'ehbo':
      return firstAidIcon;
    case 'baby':
      return babyIcon;
    case 'car':
      return carIcon;
    case 'insurance':
      return insuranceIcon;

    default:
      return;
  }
};

const Section = ({ heading, children, feature, border }) => {
  return (
    <Container border={border}>
      <div>
        <Icon src={getRightImg(feature)} />
      </div>
      <TextContainer>
        <Heading>{heading}</Heading>
        <Paragraph light fontSize="0.9375rem">
          {children}
        </Paragraph>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  padding-bottom: 1rem;
  border-bottom: ${props => props.border && '1px solid #e6e6e6'};
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
`;

const TextContainer = styled.div`
  flex: 1;
  margin-left: 0.5rem;
`;
const Heading = styled.h2`
  font-size: 0.875rem;
  font-family: ${props => props.theme.secondaryFont};
  font-weight: 400;
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
`;

export default Section;
