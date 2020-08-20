import { Paragraph } from 'Components/Text';
import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';

const ThankYou = () => {
  return (
    <Container>
      <Heading>
        <FormattedMessage id="angelReference.thankYou" />
      </Heading>
      <Paragraph> 
        <FormattedMessage id="angelReference.thankYouExplanation" />
      </Paragraph>
    </Container>
  );
};


const Container = styled.div`
  padding: ${isMobile ? '1rem' : 0};
  width: 100%;
`;

const Heading = styled.h2`
  font-size: 1.1rem;
`;



export default ThankYou;
