import React from 'react';
import styled from 'styled-components';

import Heading from '../Heading';
import Container from '../Container';
import Toggle from 'Components/Toggle';

const SettingSection = ({
  title,
  value,
  toggleName1,
  toggleName2,
  toggleVal1,
  toggleVal2,
  onSettingsChange1,
  onSettingsChange2,
  border = false,
}) => {
  return (
    <Container border={border}>
      <HeadingContainer>
        <Heading noMargin>{title}</Heading>
        {value && <Value>{value}</Value>}
      </HeadingContainer>
      <ToggleContainer>
        <ToggleName>{toggleName1}</ToggleName>
        <Toggle onChange={onSettingsChange1} value={toggleVal1} />
      </ToggleContainer>
      {toggleName2 ? <ToggleContainer>
        <ToggleName>{toggleName2}</ToggleName>
        <Toggle onChange={onSettingsChange2} value={toggleVal2} />
      </ToggleContainer> : null}
    </Container>
  );
};

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Value = styled.div`
  font-weight: 300;
  font-size: 1rem;
`;
const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0;
`;

const ToggleName = styled.div`
  font-weight: 300;
  font-size: 0.9375rem;
`;

export default SettingSection;
