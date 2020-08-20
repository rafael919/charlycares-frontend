import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

const Container = styled.p`
  font-family: ${({ theme }) => theme.primaryFont};
  text-align: center;
  ling-height: 1.5;
  margin-top: -3.5625rem !important;
`;

const NoAngelsInfo = ({ intl }) => (
  <Container>
    {intl.formatMessage({ id: 'booking.search.noResults' })}
  </Container>
);

export default injectIntl(NoAngelsInfo);
