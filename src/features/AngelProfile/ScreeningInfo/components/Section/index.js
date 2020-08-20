import { Paragraph } from 'Components/Text';
import CustomRow from 'Components/CustomRow';
import React from 'react';
import styled from 'styled-components';

const Section = ({ title, children }) => {
  return (
    <CustomRow padding="0 0 1rem 0">
      <SectionHeader>{title}</SectionHeader>
      <Paragraph light fontSize="0.9375rem">
        {children}
      </Paragraph>
    </CustomRow>
  );
};

const SectionHeader = styled.h2`
  font-size: 0.9375rem;
  font-family: ${props => props.theme.secondaryFont};
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

export default Section;
