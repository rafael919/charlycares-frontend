import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Header } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';

const Container = styled.div`
  padding: 1rem;
  padding-top: 2rem;
`;

const VideoExplanation = () => (
  <Container>
    <Header as="h4">
      <FormattedMessage id="angel.videoModal.title" />
    </Header>
    <Paragraph secondaryText fontSize="0.9375rem" light>
      <FormattedMessage id="angel.videoModal.body" />
    </Paragraph>
  </Container>
);

export default VideoExplanation;
