import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Header } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';

const Container = styled.div`
  padding: 1rem;
  padding-top: 2rem;
`;

const ScreeningExplanation = () => (
  <Container>
    <Header as="h4">
      <FormattedMessage id="angel.screeningModal.title" />
    </Header>
    <Paragraph secondaryText fontSize="0.9375rem" light>
      <FormattedMessage id="angel.screeningModal.body" />
    </Paragraph>
  </Container>
);

export default ScreeningExplanation;
