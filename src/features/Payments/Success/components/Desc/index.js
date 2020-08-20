import React from 'react';
import styled from 'styled-components';
import { Paragraph } from 'Components/Text';
import { FormattedMessage } from 'react-intl';

const Container = styled.div`
  padding: 0 1.25rem 1.5rem;
`;

const Heading = styled.h2`
  font-size: 1rem;
`;

const Desc = () => (
  <Container>
    <Heading><FormattedMessage id="payments.family.success.descTitle" /></Heading>
    <Paragraph fontSize="0.9375rem" light>
      <FormattedMessage id="payments.family.success.desc" />
    </Paragraph>
  </Container>
);

export default Desc;
