import React from 'react';
import styled from 'styled-components';
import dayIcon from 'Assets/icons/icn-feature-day.svg';
import nightIcon from 'Assets/icons/icn-feature-night.svg';
import morningIcon from 'Assets/icons/morning.svg';
import { injectIntl } from 'react-intl';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const InnerContainer = styled.div`
  flex: 1;
  display: flex;
`;
const Placeholder = styled.div`
  flex: 0.6;
`;

const IconTextContainer = styled.div`
  display: flex;
  flex: 0.5;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Icon = styled.img``;
const Text = styled.p`
  font-size: 0.75rem;
`;

const NightDay = ({ intl }) => (
  <Container>
    <Placeholder />
    <InnerContainer>
      <IconTextContainer>
        <Icon src={morningIcon} />
        <Text>
          {intl.formatMessage({
            id: 'calendar.angel.fixedSitter.morning',
          })}
        </Text>
      </IconTextContainer>
      <IconTextContainer>
        <Icon src={dayIcon} />
        <Text>
          {intl.formatMessage({
            id: 'calendar.angel.fixedSitter.afternoon',
          })}
        </Text>
      </IconTextContainer>
      <IconTextContainer>
        <Icon src={nightIcon} />
        <Text>
          {intl.formatMessage({
            id: 'calendar.angel.fixedSitter.evening',
          })}
        </Text>
      </IconTextContainer>
    </InnerContainer>
  </Container>
);

export default injectIntl(NightDay);
