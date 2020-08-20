import React from 'react';
import styled from 'styled-components';
import { Paragraph } from 'Components/Text';
import { FormattedMessage } from 'react-intl';

const Container = styled.div`
  padding: 1.25rem;
`;

const Heading = styled.h2`
  font-size: 1rem;
`;

const Desc = () => (
  <Container>
    <Heading><FormattedMessage id="payments.family.expiredCard.title" /></Heading>
    <Paragraph fontSize="0.9375rem" light>
      <FormattedMessage id="payments.family.expiredCard.desc" />
    </Paragraph>
  </Container>
);

export default Desc;
