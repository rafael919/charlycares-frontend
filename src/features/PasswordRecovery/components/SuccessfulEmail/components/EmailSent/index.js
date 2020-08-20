import React from 'react';
import styled from 'styled-components';
import checkIcon from 'Assets/icons/icn-check-blue.svg';
import { injectIntl } from 'react-intl';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  margin-right: 1rem;
`;

const Desc = styled.p`
  font-family: ${({ theme }) => theme.secondaryFont};
  font-weight: 300;
  font-size: 0.9375rem;
`;

const EmailSent = ({ intl }) => (
  <Container>
    <Icon src={checkIcon} />
    <Desc>
      {intl.formatMessage({
        id: 'password.recovery.emailSent',
      })}
    </Desc>
  </Container>
);

export default injectIntl(EmailSent);
