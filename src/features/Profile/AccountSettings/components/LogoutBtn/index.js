import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';
import AppVersion from './components/AppVersion';

const LogoutBtn = props => {
  return (
    <ButtonContainer>
      <Button {...props}>
        <FormattedMessage id="profile.family.credentials.logOutBtn" />
      </Button>
      <AppVersion>
        version {process.env.REACT_APP_VERSION} -{' '}
        {process.env.REACT_APP_RELEASE_STAGE}
      </AppVersion>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 7rem;
`;

const Button = styled.button`
  font-family: ${props => props.theme.primaryFont};
  color: ${props => props.theme.secondaryColor};
  font-size: 1rem;
  background: transparent;
  border: 0;
  margin: 0;
  margin-bottom: 1.5rem;

  &:focus {
    outline: 0;
  }
`;

export default LogoutBtn;
