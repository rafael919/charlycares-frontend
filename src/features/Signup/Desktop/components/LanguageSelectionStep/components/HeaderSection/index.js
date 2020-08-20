import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const Header = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  font-family: ${props => props.theme.primaryFont};
  margin-bottom: 0.75rem;
`;
const SuvHeader = styled.h2`
  font-size: 0.9375rem;
  font-weight: 300;
  font-family: ${props => props.theme.secondaryFont};
  margin: 0;
`;
const Container = styled.div`
  margin-bottom: 2rem;
`;

const HeaderSection = ({ userRole }) => (
  <Container>
    <Header>
      <FormattedMessage id="signup.fourthBStep.header" />
    </Header>
    <SuvHeader>
      {userRole && userRole === 'family' ? (
        <FormattedMessage id="signup.family.fourthBStep.subHeader" />
      ) : (
        <FormattedMessage id="signup.angel.fourthBStep.subHeader" />
      )}
    </SuvHeader>
  </Container>
);

export default HeaderSection;
