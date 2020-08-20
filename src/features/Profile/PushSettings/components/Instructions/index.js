import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import IosStep1 from 'Assets/images/ios-push1.jpg';
import IosStep2 from 'Assets/images/ios-push2.jpg';
import AndroidStep1 from 'Assets/images/ios-push1.jpg';
import { isIOS } from 'react-device-detect';
import Divider from 'Components/Divider';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
  width: 100%;
`;

const Title = styled.h4`

`

const Screenshot = styled.img`
  width: 80%;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  margin-top: 1rem;
  color: ${props => props.theme.grey};
  font-size: 0.75rem;
`;

const openSettings = () => {
  window.webkit.messageHandlers.iOS.postMessage("shouldOpenSettings");
}

const Step = styled.p`
  color: ${props => props.theme.secondaryColor};
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 2rem;
`

const Instructions = () => {
  return (
    <List>
      {isIOS ? (
        <div>
          <Title>
            <FormattedMessage id="profile.family.pushSettings.steps.checkSettingsTitle" />
          </Title>
          <Step onClick={openSettings}>
            <FormattedMessage id="profile.family.pushSettings.steps.checkSettingsDesc" />
          </Step>
          <Divider inner />
        </div>
      ) : null}
      <Title>
        <FormattedMessage id="profile.family.pushSettings.steps.title" />
      </Title>
      {isIOS ? 
        <div>
          <Description>
            <FormattedMessage id="profile.family.pushSettings.steps.description1" />
          </Description>
          <Screenshot src={IosStep1}/> 
          <Description>
            <FormattedMessage id="profile.family.pushSettings.steps.description2" />
          </Description>
          <Screenshot src={IosStep2}/>
        </div>
      : <div>
          <Description>
            <FormattedMessage id="profile.family.pushSettings.steps.description1" />
          </Description>
          <Screenshot src={AndroidStep1}/> 
        </div>
      }
    </List>
  );
}

export default Instructions;