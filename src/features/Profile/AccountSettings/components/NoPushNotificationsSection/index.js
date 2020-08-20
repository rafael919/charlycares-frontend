import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import Heading from '../Heading';
import Container from '../Container';
import CheckIcon from 'Assets/icons/check.svg';

const NoPushNotificationsSection = ({onRegisterPush, goToInstructions, hasRegistered}) => {
  return (
    <Container id="noPush">
      <HeadingContainer>
        <Heading noMargin>
          <FormattedMessage id="profile.family.settings.noPush" />
        </Heading>
      </HeadingContainer>
      <Step>
        <FormattedMessage id="profile.family.settings.checkSettings" />
      </Step>
      <Button onClick={goToInstructions}> 
        <FormattedMessage id="profile.family.settings.checkSettingsButton"  />
      </Button>
      <Step>
        <FormattedMessage id="profile.family.settings.registerPush" />
      </Step>
        <Button onClick={onRegisterPush}> 
          <FormattedMessage id="profile.family.settings.registerPushButton"  />
          {hasRegistered && <Checked src={CheckIcon} />}
        </Button>
    </Container>
  );
};

const Checked = styled.img`
  width: 1rem;
  margin-left: 1rem;
`
const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Step = styled.div`
  padding: 0.5rem 0 0.5rem 0;
  color: ${props => props.theme.grey};
  font-size: 0.75rem;
`;

const Button = styled.div`
  padding: 0.5rem 0 0.5rem 0;
  font-weight: 300;
  color: ${props => props.theme.secondaryColor};
  font-size: 0.875rem;
  text-align: center;
`;

export default NoPushNotificationsSection;
